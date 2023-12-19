import React from "react";
import styles from "./ChatMessageNodeView.module.scss";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export type ChatMessageNodeViewProps = {};

export const ChatMessageNodeView: React.FC<ChatMessageNodeViewProps> = (props) => {
  // const {} = props;
  return (
    <NodeViewWrapper className={styles.ChatMessageNodeView}>
      <span>ChatMessage NodeView</span>
      <NodeViewContent className={styles.ChatMessageNodeViewContent} />
    </NodeViewWrapper>
  );
};
