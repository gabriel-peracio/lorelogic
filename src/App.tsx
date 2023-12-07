import styles from "./App.module.scss";
import "./ProseMirror.scss";
import { EditorOptions, JSONContent } from "@tiptap/react";
import { JSONStateToMarkdown } from "utils/prosemirror";
import { useEffect, useMemo, useState } from "react";
import { Editor } from "Components/Editor/Editor";
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

export const App = () => {
  const [nlp, its, as] = useMemo(() => {
    const nlp = winkNLP(model);
    const its = nlp.its;
    const as = nlp.as;

    return [nlp, its, as];
  }, []);
  const [editorState, setEditorState] = useState<JSONContent>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Here's a hypothetical scenario: I have two spaceships, A and B, who begin their journeys on earth and may communicate together at will with near infinite bandwidth while they are together.`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `They will travel to opposite locations of the universe at quasi-relativistic speeds.`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Both ships are piloted by gigantic 5 trillion parameter AI models, and have the capability to modify their own internal structure, effectively a sort of "continuous training".`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Once they arrive at their destinations, they wish to compare models with each other. They are 1 light year apart, though, and may only communicate through a single, very narrow 8kbps (8kb each way) connection which, while guaranteed-reliable, also has a 2 light year round trip. Assume that the 8kb is the "effective bandwidth" after accounting for all protocol overhead and integrity verifications have been performed.`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Both ships A and B have enormous, supercomputing-cluster levels of hardware resources at their disposal.`,
          },
        ],
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: `How would you transfer their files, 4Tb in size, to each other?` }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Remember that while they are together on earth, before traveling, they may communicate as much as they want with practically limitless bandwidth.`,
          },
        ],
      },
    ],
  });
  const handleUpdate: EditorOptions["onUpdate"] = ({ editor }) => {
    const state = editor.getJSON();
    setEditorState(state);
  };

  const docAsMarkdown = useMemo(() => {
    return JSONStateToMarkdown(editorState);
  }, [editorState]);

  useEffect(() => {
    const doc = nlp.readDoc(docAsMarkdown);
    console.log("sentences", doc.sentences().out());
  }, [docAsMarkdown, nlp]);

  return (
    <div className={styles.App}>
      <Editor initialContent={editorState} onUpdate={handleUpdate} />
      <div className={styles.markdownPreview}>{docAsMarkdown}</div>
    </div>
  );
};
