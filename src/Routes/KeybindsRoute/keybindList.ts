import { dropRight, sortBy } from "lodash";

type Keybind = {
  identifier: string;
  description: string;
  default: string;
};

export const keybindList: Keybind[] = [
  {
    identifier: "editor.autocomplete.accept",
    description: "Accept autocomplete suggestion",
    default: "Tab",
  },
  {
    identifier: "editor.autocomplete.cancel",
    description: "Cancel autocomplete request, or reject current suggestion",
    default: "Escape",
  },
  {
    identifier: "editor.autocomplete.next",
    description: "Request next autocomplete suggestion",
    default: "Shift+Tab",
  },
  {
    identifier: "editor.textFormatting.bold",
    description: "Toggle bold formatting",
    default: "Ctrl+B",
  },
  {
    identifier: "editor.textFormatting.italic",
    description: "Toggle italic formatting",
    default: "Ctrl+I",
  },
  {
    identifier: "editor.textFormatting.strikethrough",
    description: "Toggle strikethrough formatting",
    default: "Ctrl+Shift+S",
  },
  {
    identifier: "editor.textFormatting.underline",
    description: "Toggle underline formatting",
    default: "Ctrl+U",
  },
  {
    identifier: "editor.textFormatting.inlineCode",
    description: "Toggle inline code formatting",
    default: "Ctrl+E",
  },
  {
    identifier: "editor.paragraphFormatting.normal",
    description: "Apply normal text style",
    default: "Ctrl+0",
  },
  {
    identifier: "editor.paragraphFormatting.heading1",
    description: "Apply Heading 1 style",
    default: "Ctrl+1",
  },
  {
    identifier: "editor.paragraphFormatting.heading2",
    description: "Apply Heading 2 style",
    default: "Ctrl+2",
  },
  {
    identifier: "editor.paragraphFormatting.heading3",
    description: "Apply Heading 3 style",
    default: "Ctrl+3",
  },
  {
    identifier: "editor.paragraphFormatting.heading4",
    description: "Apply Heading 4 style",
    default: "Ctrl+4",
  },
  {
    identifier: "editor.paragraphFormatting.heading5",
    description: "Apply Heading 5 style",
    default: "Ctrl+5",
  },
  {
    identifier: "editor.paragraphFormatting.heading6",
    description: "Apply Heading 6 style",
    default: "Ctrl+6",
  },
  {
    identifier: "editor.paragraphFormatting.orderedList",
    description: "Convert paragraph to ordered list",
    default: "Ctrl+shift+7",
  },
  {
    identifier: "editor.paragraphFormatting.unorderedList",
    description: "Convert paragraph to unordered (bullet) list",
    default: "Ctrl+shift+8",
  },
  {
    identifier: "editor.paragraphFormatting.checkList",
    description: "Convert paragraph to check/task list",
    default: "Ctrl+shift+9",
  },
  {
    identifier: "editor.paragraphFormatting.codeBlock",
    description: "Convert selected text to code block",
    default: "Ctrl+Alt+C",
  },
];

export const keybindGroups: { [key: string]: Keybind[] } = Object.groupBy(
  sortBy(keybindList, (kl) => dropRight(kl.identifier.split(".")).join(".")),
  (keybind) => dropRight(keybind.identifier.split(".")).join("."),
);
