import { useEditor, EditorContent, EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./Editor.module.scss";
import { AutocompletePlugin } from "./extensions/Autocomplete/Autocomplete";
import clsx from "clsx";
import { Chat } from "ProseMirror/NodeViews/Chat/Chat";
import { ChatMessage } from "ProseMirror/NodeViews/ChatMessage/ChatMessage";

type EditorProps = {
  onUpdate: EditorOptions["onUpdate"];
  initialContent: EditorOptions["content"];
  className?: string;
};

export const Editor: React.FC<EditorProps> = ({ onUpdate, initialContent, className }) => {
  const editor = useEditor({
    extensions: [StarterKit, AutocompletePlugin, Chat, ChatMessage],
    content: initialContent,
    onUpdate,
  });

  return (
    <div className={clsx(styles.Editor, className)}>
      <EditorContent editor={editor} className={styles.EditorContent} />
    </div>
  );
};
