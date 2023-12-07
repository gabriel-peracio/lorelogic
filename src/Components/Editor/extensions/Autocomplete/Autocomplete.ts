import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DecorationSet, Decoration } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import styles from "./Autocomplete.module.scss";
import { JSONStateToMarkdown } from "utils/prosemirror";

export const AutocompletePlugin = Extension.create({
  // Your code here
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("Autocomplete"),
        state: {
          init(config, state) {
            return null;
          },
          apply(tr, previousState) {
            if (tr.selection.$to.pos + 1 === tr.selection.$to.after()) {
              // this is the end of the node
              const contentBeforeCaret = tr.doc.cut(0, tr.selection.$to.pos);
              const asMarkdown = JSONStateToMarkdown(contentBeforeCaret.toJSON());
              console.log(`asMarkdown:`, asMarkdown);
            }
            return previousState;
          },
        },
        props: {
          decorations: (state) => {
            const cursorPos = state.selection.$to.pos;
            if (state.selection.$to.pos + 1 === state.selection.$to.after()) {
              // this is the end of the node
              return DecorationSet.create(state.doc, [Decoration.widget(cursorPos, createCompletionDecoration(state))]);
            }
            return DecorationSet.empty;
          },
        },
      }),
    ];
  },
});

const createCompletionDecoration = (state: EditorState): Node => {
  const el = document.createElement("span");
  el.classList.add(styles.autocomplete);
  el.innerHTML = "Hello";
  return el;
};
