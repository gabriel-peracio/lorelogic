import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ChatMessageNodeView } from "./ChatMessageNodeView";

export type ChatMessageOptions = {};

export const ChatMessage = Node.create<ChatMessageOptions>({
  name: "chatMessage",
  content: "block*",
  group: "block",
  addAttributes() {
    return {
      author: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="chatMessage"]',
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ["div", HTMLAttributes, 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ChatMessageNodeView);
  },
});
