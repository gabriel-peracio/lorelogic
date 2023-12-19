import React, { useState } from "react";
import styles from "./ChatNodeView.module.scss";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export type ChatNodeViewProps = NodeViewProps;

export const ChatNodeView: React.FC<ChatNodeViewProps> = (props) => {
  const [hasFocus, setHasFocus] = useState(false);
  // const {} = props;
  props.editor.on("selectionUpdate", () => {
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode) return;
    const nodeDOM = props.editor.view.nodeDOM(props.getPos());
    if (!nodeDOM || !(nodeDOM instanceof HTMLElement)) return;
    setHasFocus(nodeDOM.contains(sel.anchorNode));
  });
  return (
    <NodeViewWrapper className={styles.ChatNodeView}>
      <span>Chat NodeView (focus: {hasFocus.toString()})</span>
      <NodeViewContent className={styles.ChatNodeViewContent} />
    </NodeViewWrapper>
  );
};
