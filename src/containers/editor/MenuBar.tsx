/* eslint-disable max-lines */
import {
  AutoFixNormal,
  Checklist,
  Clear,
  Code,
  Colorize,
  DataObject,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  HorizontalRule,
  InsertPhoto,
  // KeyboardReturn,
  LinkOff,
  Redo,
  Subscript,
  Superscript,
  TextFields,
  Texture,
  Undo,
} from "@mui/icons-material";
import { useCurrentEditor } from "@tiptap/react";
import FormatType from "./FormatType";
import formatFn from "./formatFn";
import FormatButton from "./FormatButton";
import React, { useEffect } from "react";
import convertImageToDataUri from "./convertImageToDataUri";
import { Box, useTheme } from "@mui/material";

const ToolbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.grey[100] }}>{children}</Box>
  );
};
export default function MenuBar() {
  const { editor } = useCurrentEditor();

  const chain = (type: FormatType) => formatFn(editor, type);

  useEffect(() => {
    document.body.addEventListener("paste", (e) => {
      const dT = e.clipboardData;
      const file = dT.files[0];

      if (file) {
        convertImageToDataUri(file, (dataUri) => {
          editor.commands.setImage({
            src: dataUri as string,
            alt: file.name,
          });
        });
      }
    });
  }, [editor.commands]);
  if (!editor) return null;

  const addImage = () => {
    window.dialog.selectFile("images").then((img) => {
      editor.commands.setImage({ src: img });
    });
  };
  return (
    <div
      className="control-group"
      style={{
        backgroundColor: "white",
        zIndex: 2,
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: 2,
      }}
    >
      <ToolbarWrapper>
        <FormatButton tooltip="Bold" {...chain("bold")}>
          <FormatBold />
        </FormatButton>
        <FormatButton tooltip="Italic" {...chain("italic")}>
          <FormatItalic />
        </FormatButton>
        <FormatButton tooltip="Underline" {...chain("underline")}>
          <FormatUnderlined />
        </FormatButton>
        <FormatButton tooltip="Strike through" {...chain("strike")}>
          <FormatStrikethrough />
        </FormatButton>
        <FormatButton tooltip="Superscript" {...chain("superscript")}>
          <Superscript />
        </FormatButton>
        <FormatButton tooltip="Subscript" {...chain("subscript")}>
          <Subscript />
        </FormatButton>
        <FormatButton tooltip="inline-code" {...chain("code")}>
          <Code />
        </FormatButton>
      </ToolbarWrapper>
      <ToolbarWrapper>
        <FormatButton tooltip="Paragraph" {...chain("paragraph")}>
          <TextFields />
        </FormatButton>
        <FormatButton tooltip="Heading 1" {...chain("heading-1")}>
          H1
        </FormatButton>
        <FormatButton tooltip="Heading 2" {...chain("heading-2")}>
          H2
        </FormatButton>
        <FormatButton tooltip="Heading 3" {...chain("heading-3")}>
          H3
        </FormatButton>
        <FormatButton tooltip="Heading 4" {...chain("heading-4")}>
          H4
        </FormatButton>
        <FormatButton tooltip="Heading 5" {...chain("heading-5")}>
          H5
        </FormatButton>
        <FormatButton tooltip="Heading 6" {...chain("heading-6")}>
          H6
        </FormatButton>
      </ToolbarWrapper>

      <ToolbarWrapper>
        <FormatButton tooltip="List" {...chain("bulletList")}>
          <FormatListBulleted />
        </FormatButton>
        <FormatButton tooltip="Ordered List" {...chain("orderedList")}>
          <FormatListNumbered />
        </FormatButton>
        <FormatButton tooltip="Checklist" {...chain("taskList")}>
          <Checklist />
        </FormatButton>
      </ToolbarWrapper>
      <ToolbarWrapper>
        <FormatButton tooltip="Blockquote" {...chain("blockquote")}>
          <FormatQuote />
        </FormatButton>
        <FormatButton tooltip="Code block" {...chain("codeBlock")}>
          <DataObject />
        </FormatButton>
      </ToolbarWrapper>
      <ToolbarWrapper>
        {/* <FormatButton tooltip="Hard break" {...chain("hardBreak")}>
          <KeyboardReturn />
        </FormatButton> */}
        <FormatButton tooltip="Horizontal rule" {...chain("horizontalRule")}>
          <HorizontalRule />
        </FormatButton>
      </ToolbarWrapper>
      <ToolbarWrapper>
        <FormatButton tooltip="Clear formatting" {...chain("clear-text")}>
          <AutoFixNormal />
        </FormatButton>
        <FormatButton tooltip="Clear all" {...chain("clear-all")}>
          <Clear />
        </FormatButton>
        <FormatButton tooltip="Unlink" {...chain("link")}>
          <LinkOff />
        </FormatButton>
      </ToolbarWrapper>
      <FormatButton
        tooltip="Add image"
        onClick={() => addImage()}
        color="secondary"
      >
        <InsertPhoto />
      </FormatButton>
      <ToolbarWrapper>
        <FormatButton tooltip="Color" {...chain("color")}>
          <Colorize />
        </FormatButton>
        <FormatButton tooltip="highlight" {...chain("highlight")}>
          <Texture />
        </FormatButton>
      </ToolbarWrapper>
      <ToolbarWrapper>
        <FormatButton tooltip="Align left" {...chain("align-left")}>
          <FormatAlignLeft />
        </FormatButton>
        <FormatButton tooltip="Align center" {...chain("align-center")}>
          <FormatAlignCenter />
        </FormatButton>
        <FormatButton tooltip="Align right" {...chain("align-right")}>
          <FormatAlignRight />
        </FormatButton>
        <FormatButton tooltip="Align justify" {...chain("align-justify")}>
          <FormatAlignJustify />
        </FormatButton>
      </ToolbarWrapper>
      <ToolbarWrapper>
        <FormatButton tooltip="Undo" {...chain("undo")}>
          <Undo />
        </FormatButton>
        <FormatButton tooltip="Redo" {...chain("redo")}>
          <Redo />
        </FormatButton>
      </ToolbarWrapper>
    </div>
  );
}
