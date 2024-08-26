/* eslint-disable max-lines */
import { Editor } from "@tiptap/react";
import FormatType from "./FormatType";
import ChainType from "./ChainType";

export default function formatFn(editor: Editor, type: FormatType): ChainType {
  const focus = editor.chain().focus();
  const color = editor.isActive(type) ? "primary" : "secondary";
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
    case "strike":
      return {
        onClick: () => focus.toggleStrike().run(),
        color,
      };
    case "code":
      return {
        onClick: () => focus.toggleCode().run(),
        color,
      };
    case "clear-text":
      return {
        onClick: () => focus.unsetAllMarks().run(),
        color,
      };
    case "clear-all":
      return {
        onClick: () => focus.clearNodes().run(),
        color,
      };
    case "paragraph":
      return {
        onClick: () => focus.setParagraph().run(),
        color,
      };
    case "heading-1":
      return {
        onClick: () => focus.toggleHeading({ level: 1 }).run(),
        color: editor.isActive("heading", { level: 1 })
          ? "primary"
          : "secondary",
      };
    case "heading-2":
      return {
        onClick: () => focus.toggleHeading({ level: 2 }).run(),
        color: editor.isActive("heading", { level: 2 })
          ? "primary"
          : "secondary",
      };
    case "heading-3":
      return {
        onClick: () => focus.toggleHeading({ level: 3 }).run(),
        color: editor.isActive("heading", { level: 3 })
          ? "primary"
          : "secondary",
      };
    case "heading-4":
      return {
        onClick: () => focus.toggleHeading({ level: 4 }).run(),
        color: editor.isActive("heading", { level: 4 })
          ? "primary"
          : "secondary",
      };
    case "heading-5":
      return {
        onClick: () => focus.toggleHeading({ level: 5 }).run(),
        color: editor.isActive("heading", { level: 5 })
          ? "primary"
          : "secondary",
      };
    case "heading-6":
      return {
        onClick: () => focus.toggleHeading({ level: 6 }).run(),
        color: editor.isActive("heading", { level: 6 })
          ? "primary"
          : "secondary",
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
    case "codeBlock":
      return {
        onClick: () => focus.toggleCodeBlock().run(),
        color,
      };
    case "blockquote":
      return {
        onClick: () => focus.toggleBlockquote().run(),
        color,
      };
    // case "hardBreak":
    //   return {
    //     onClick: () => focus.setHardBreak().run(),
    //     color,
    // };
    case "horizontalRule":
      return {
        onClick: () => focus.setHorizontalRule().run(),
        color,
      };
    case "undo":
      return {
        onClick: () => focus.undo().run(),
        color,
      };
    case "redo":
      return {
        onClick: () => focus.redo().run(),
        color,
      };
    case "underline":
      return {
        onClick: () => focus.toggleUnderline().run(),
        color,
      };
    case "superscript":
      return {
        onClick: () => focus.toggleSuperscript().run(),
        color,
      };
    case "subscript":
      return {
        onClick: () => focus.toggleSubscript().run(),
        color,
      };
    case "color":
      return {
        onClick: () => focus.setColor("#0000ff").run(),
        color: editor.isActive("textStyle", { color: "#0000ff" })
          ? "primary"
          : "secondary",
      };
    case "highlight":
      return {
        onClick: () => focus.toggleHighlight({ color: "#ffc078" }).run(),
        color: editor.isActive("highlight", { color: "#ffc078" })
          ? "primary"
          : "secondary",
      };
    case "taskList":
      return {
        onClick: () => focus.toggleTaskList().run(),
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
        color: editor.isActive({ textAlign: "left" }) ? "primary" : "secondary",
      };
    case "align-right":
      return {
        onClick: () => focus.setTextAlign("right").run(),
        color: editor.isActive({ textAlign: "right" })
          ? "primary"
          : "secondary",
      };
    case "align-center":
      return {
        onClick: () => focus.setTextAlign("center").run(),
        color: editor.isActive({ textAlign: "center" })
          ? "primary"
          : "secondary",
      };
    case "align-justify":
      return {
        onClick: () => focus.setTextAlign("justify").run(),
        color: editor.isActive({ textAlign: "justify" })
          ? "primary"
          : "secondary",
      };

    default:
      return null;
  }
}
