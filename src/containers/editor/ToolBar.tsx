/* eslint-disable max-lines */
import {
  AutoFixNormal,
  Clear,
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
  InsertPhoto,
  LinkOff,
  Redo,
  TextFields,
  Texture,
  Undo,
} from "@mui/icons-material";
import { useCurrentEditor } from "@tiptap/react";
import FormatType from "./FormatType";
import formatToolbar from "./formatToolbar";
import FormatButton from "./FormatButton";
import { useEffect } from "react";
import convertImageToDataUri from "./convertImageToDataUri";
import { Typography } from "@mui/material";
import Count from "./Count";
import BROWSER from "@/constants/BROWSER";
import ToolbarIconsWrapper from "./ToolbarIconsWrapper";

export default function ToolBar() {
  const { editor } = useCurrentEditor();

  const chain = (type: FormatType) => formatToolbar(editor, type);

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
    window.api
      .sendMessage({
        type: "select-file",
        filter: "images",
      })
      .then((img: string) => {
        editor.commands.setImage({ src: img });
      });
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "sticky",
        top: BROWSER.TOP,
        zIndex: 1000,
      }}
    >
      <div
        className="control-group"
        style={{
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: 2,
        }}
      >
        <ToolbarIconsWrapper>
          <FormatButton tooltip="Bold">
            <FormatBold {...chain("bold")} />
          </FormatButton>
          <FormatButton tooltip="Italic">
            <FormatItalic {...chain("italic")} />
          </FormatButton>
          <FormatButton tooltip="Underline">
            <FormatUnderlined {...chain("underline")} />
          </FormatButton>
          <FormatButton tooltip="Strike through">
            <FormatStrikethrough {...chain("strike")} />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="Paragraph">
            <TextFields {...chain("paragraph")} />
          </FormatButton>
          <FormatButton tooltip="Heading 1">
            <Typography {...chain("heading-1")} variant="button">
              H1
            </Typography>
          </FormatButton>
          <FormatButton tooltip="Heading 2">
            <Typography {...chain("heading-2")} variant="button">
              H2
            </Typography>
          </FormatButton>
          <FormatButton tooltip="Heading 3">
            <Typography {...chain("heading-3")} variant="button">
              H3
            </Typography>
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="List">
            <FormatListBulleted {...chain("bulletList")} />
          </FormatButton>
          <FormatButton tooltip="Ordered List">
            <FormatListNumbered {...chain("orderedList")} />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="Blockquote">
            <FormatQuote {...chain("blockquote")} />
          </FormatButton>
          <FormatButton tooltip="Add image">
            <InsertPhoto onClick={() => addImage()} color="inherit" />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="Clear formatting">
            <AutoFixNormal {...chain("clear-text")} />
          </FormatButton>
          <FormatButton tooltip="Clear all" {...chain("clear-all")}>
            <Clear />
          </FormatButton>
          <FormatButton tooltip="Unlink">
            <LinkOff {...chain("link")} />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="highlight">
            <Texture {...chain("highlight")} />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="Align left">
            <FormatAlignLeft {...chain("align-left")} />
          </FormatButton>
          <FormatButton tooltip="Align center">
            <FormatAlignCenter {...chain("align-center")} />
          </FormatButton>
          <FormatButton tooltip="Align right">
            <FormatAlignRight {...chain("align-right")} />
          </FormatButton>
          <FormatButton tooltip="Align justify">
            <FormatAlignJustify {...chain("align-justify")} />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="Undo">
            <Undo {...chain("undo")} />
          </FormatButton>
          <FormatButton tooltip="Redo">
            <Redo {...chain("redo")} />
          </FormatButton>
        </ToolbarIconsWrapper>
      </div>
      <div className="row" style={{ justifyContent: "center" }}>
        <Count />
      </div>
    </div>
  );
}
