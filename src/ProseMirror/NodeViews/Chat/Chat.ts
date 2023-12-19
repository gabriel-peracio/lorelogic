import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ChatNodeView } from "./ChatNodeView";

export type ChatOptions = {};

export const Chat = Node.create<ChatOptions>({
  name: "chat",
  content: "chatMessage+",
  group: "block",
  defining: true,
  isolating: true,
  addAttributes() {
    return {};
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-node-type="chat"]',
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ["div", HTMLAttributes, 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ChatNodeView, { attrs: { "data-node-type": "chat" } });
  },
});
