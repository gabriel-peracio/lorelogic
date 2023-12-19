import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DecorationSet, Decoration, EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import styles from "./Autocomplete.module.scss";
import { JSONStateToMarkdown } from "utils/prosemirror";
import { streamLines } from "Services/FireworksAI/FireworksAI";
import { debounce } from "lodash";

let controller = new AbortController();
const AutocompletePluginKey = new PluginKey("Autocomplete");

enum AutocompletePluginStatus {
  Idle = "idle",
  Generating = "generating",
  Done = "done",
}

type AutocompletePluginState =
  | {
      status: AutocompletePluginStatus.Idle;
    }
  | {
      status: AutocompletePluginStatus.Generating | AutocompletePluginStatus.Done;
      pos: number;
      completion: string;
    };
type AutocompletePluginMeta =
  | {
      completion: string;
    }
  | {
      status: AutocompletePluginStatus.Done;
    }
  | {
      status: AutocompletePluginStatus.Generating;
      pos: number;
      completion: string;
    };

let editorView: EditorView;

export const AutocompletePlugin = Extension.create({
  // Your code here
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: AutocompletePluginKey,
        state: {
          init(config, state): AutocompletePluginState {
            return {
              status: AutocompletePluginStatus.Idle,
            };
          },
          apply(tr, previousState): AutocompletePluginState {
            let meta: AutocompletePluginMeta = tr.getMeta(AutocompletePluginKey);
            if (
              meta &&
              (previousState.status === AutocompletePluginStatus.Generating ||
                previousState.status === AutocompletePluginStatus.Done)
            ) {
              if ("status" in meta) {
                return {
                  ...previousState,
                  ...meta,
                };
              }
              if ("completion" in meta) {
                return {
                  status: AutocompletePluginStatus.Generating,
                  pos: previousState.pos,
                  completion: meta.completion,
                };
              }
            }

            if (
              previousState.status === AutocompletePluginStatus.Done &&
              previousState.completion.replaceAll("\n", "").trim() === ""
            ) {
              console.log(`completion is empty, reverting to idle`);
              return {
                status: AutocompletePluginStatus.Idle,
              };
            }

            const isValidPositionForCompletion = tr.selection.$to.pos + 1 === tr.selection.$to.after();
            const hasMovedCursor = "pos" in previousState && tr.selection.$to.pos !== previousState.pos;
            const isPredictionInFlight = previousState.status === AutocompletePluginStatus.Generating;

            const contextForCompletion = JSONStateToMarkdown(tr.doc.cut(0, tr.selection.$to.pos).toJSON());

            if (hasMovedCursor) {
              if (isPredictionInFlight) {
                controller.abort();
                generateCompletion.cancel(); // cancel any pending completion
              }
              if (!isValidPositionForCompletion) {
                return {
                  status: AutocompletePluginStatus.Idle,
                };
              } else {
                generateCompletion(contextForCompletion);
                return {
                  status: AutocompletePluginStatus.Generating,
                  pos: tr.selection.$to.pos,
                  completion: "",
                };
              }
            }

            if (isValidPositionForCompletion && previousState.status === AutocompletePluginStatus.Idle) {
              generateCompletion(contextForCompletion);
              return {
                status: AutocompletePluginStatus.Generating,
                pos: tr.selection.$to.pos,
                completion: "",
              };
            }
            return previousState;
          },
        },
        props: {
          decorations: (state) => {
            let pluginState: AutocompletePluginState = AutocompletePluginKey.getState(state);
            if (pluginState.status === AutocompletePluginStatus.Idle) return DecorationSet.empty;
            const cursorPos = state.selection.$to.pos;
            if (state.selection.$to.pos + 1 === state.selection.$to.after()) {
              // this is the end of the node
              return DecorationSet.create(state.doc, [Decoration.widget(cursorPos, createCompletionDecoration(state))]);
            }
            return DecorationSet.empty;
          },
          handleKeyDown(view, event) {
            const pluginState: AutocompletePluginState = AutocompletePluginKey.getState(view.state);
            if (pluginState.status !== AutocompletePluginStatus.Done) return false;
            if (event.key === "Tab") {
              event.preventDefault();
              if (event.shiftKey) {
                // shift + tab
                const tr = view.state.tr;
                tr.setMeta(AutocompletePluginKey, {
                  status: AutocompletePluginStatus.Generating,
                  pos: pluginState.pos,
                  completion: "",
                });
                view.dispatch(tr);
                const contentBeforeCaret = tr.doc.cut(0, tr.selection.$to.pos);
                const asMarkdown = JSONStateToMarkdown(contentBeforeCaret.toJSON());
                generateCompletion(asMarkdown);
                generateCompletion.flush(); // flush because the user explicitly requested a new completion
                return true;
              } else {
                const tr = view.state.tr;
                tr.insertText(AutocompletePluginKey.getState(view.state).completion);
                view.dispatch(tr);
                return true;
              }
            }
            return false;
          },
        },
        view: (v) => {
          editorView = v;
          return {};
        },
      }),
    ];
  },
});

const createCompletionDecoration = (state: EditorState): Node => {
  let pluginState: AutocompletePluginState = AutocompletePluginKey.getState(state);
  const el = document.createElement("span");
  el.classList.add(styles.autocomplete, styles[pluginState.status]);
  el.innerHTML = AutocompletePluginKey.getState(state).completion;
  if (pluginState.status === AutocompletePluginStatus.Done) {
    el.innerHTML += `<span class='${styles.shortcutList}'><kbd>Tab</kbd> accept <kbd>Esc</kbd> cancel <kbd><kbd>Shift</kbd> + <kbd>Tab</kbd></kbd> regenerate</span>`;
  }
  return el;
};

const generateCompletion = debounce(async (context: string) => {
  console.log(`generating new completion:`);
  controller = new AbortController();
  let completionSoFar = "";
  const lineStream = streamLines(context, controller);
  let line = await lineStream.next();
  while (!line.done) {
    completionSoFar += line.value;
    const tr = editorView.state.tr;
    tr.setMeta(AutocompletePluginKey, {
      completion: completionSoFar,
    });
    editorView.dispatch(tr);
    line = await lineStream.next();
  }

  // stream is done, `line` now contains statistics about the completion
  // console.log(`final value:`, line.value);

  const tr = editorView.state.tr;
  tr.setMeta(AutocompletePluginKey, {
    status: AutocompletePluginStatus.Done,
  });
  editorView.dispatch(tr);
}, 2000);
