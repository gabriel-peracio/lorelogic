import { useEditor, EditorContent, EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./Editor.module.scss";
import { AutocompletePlugin } from "./extensions/Autocomplete/Autocomplete";

type EditorProps = {
  onUpdate: EditorOptions["onUpdate"];
  initialContent: EditorOptions["content"];
};

export const Editor: React.FC<EditorProps> = ({ onUpdate, initialContent }) => {
  const editor = useEditor({
    extensions: [StarterKit, AutocompletePlugin],
    content: initialContent,
    onUpdate,
  });

  return (
    <div className={styles.Editor}>
      <EditorContent editor={editor} className={styles.EditorContent} />
    </div>
  );
};
