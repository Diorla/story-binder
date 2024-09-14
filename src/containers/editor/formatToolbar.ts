import { Editor } from "@tiptap/react";
import FormatType from "./FormatType";
import ChainType from "./ChainType";

export default function formatToolbar(
  editor: Editor | null,
  type: FormatType
): ChainType | null {
  if (!editor) return null;
  const focus = editor.chain().focus();
  const color = editor.isActive(type) ? "primary" : "inherit";

  switch (type) {
    case "bold":
      return {
        onClick: () => focus.toggleBold().run(),
        color,
      };
    case "italic":
      return {
        onClick: () => focus.toggleItalic().run(),
        color,
      };
    case "clear-text":
      return {
        onClick: () => focus.unsetAllMarks().run(),
        color,
      };
    case "heading-1":
      return {
        onClick: () => focus.toggleHeading({ level: 1 }).run(),
        color: editor.isActive("heading", { level: 1 }) ? "primary" : "inherit",
      };
    case "heading-2":
      return {
        onClick: () => focus.toggleHeading({ level: 2 }).run(),
        color: editor.isActive("heading", { level: 2 }) ? "primary" : "inherit",
      };
    case "heading-3":
      return {
        onClick: () => focus.toggleHeading({ level: 3 }).run(),
        color: editor.isActive("heading", { level: 3 }) ? "primary" : "inherit",
      };
    case "bulletList":
      return {
        onClick: () => focus.toggleBulletList().run(),
        color,
      };
    case "orderedList":
      return {
        onClick: () => focus.toggleOrderedList().run(),
        color,
      };
    case "underline":
      return {
        onClick: () => focus.toggleUnderline().run(),
        color,
      };
    case "highlight":
      return {
        onClick: () => focus.toggleHighlight().run(),
        color,
      };
    case "link":
      return {
        onClick: () => focus.extendMarkRange("link").unsetLink().run(),
        color,
      };
    case "align-left":
      return {
        onClick: () => focus.setTextAlign("left").run(),
        color: editor.isActive({ textAlign: "left" }) ? "primary" : "inherit",
      };
    case "align-right":
      return {
        onClick: () => focus.setTextAlign("right").run(),
        color: editor.isActive({ textAlign: "right" }) ? "primary" : "inherit",
      };
    case "align-center":
      return {
        onClick: () => focus.setTextAlign("center").run(),
        color: editor.isActive({ textAlign: "center" }) ? "primary" : "inherit",
      };

    default:
      return null;
  }
}
