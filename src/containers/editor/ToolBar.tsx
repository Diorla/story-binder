/* eslint-disable max-lines */
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatClear,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
  InsertPhoto,
  LinkOff,
} from "@mui/icons-material";
import { useCurrentEditor } from "@tiptap/react";
import FormatType from "./FormatType";
import formatToolbar from "./formatToolbar";
import FormatButton from "./FormatButton";
import { Link, Typography } from "@mui/material";
import Count from "./Count";
import ToolbarIconsWrapper from "./ToolbarIconsWrapper";
import { useEffectOnce, usePrevious } from "react-use";
import handlePaste from "./handlePaste";
import { useEffect, useState } from "react";
import { Heading1, Heading2, Heading3, Highlighter } from "lucide-react";

export default function ToolBar({
  initialContent,
  updateFn,
}: {
  initialContent: string;
  updateFn: (value: string) => void;
}) {
  const { editor } = useCurrentEditor();

  const chain = (type: FormatType) => formatToolbar(editor, type);

  const [localData, setLocalData] = useState(initialContent);
  const previous = usePrevious(localData);

  useEffectOnce(() => {
    if (editor) document.body.addEventListener("paste", handlePaste(editor));

    return () => {
      if (editor)
        document.body.removeEventListener("paste", handlePaste(editor));
    };
  });

  useEffectOnce(() => {
    editor?.on("update", () => {
      setLocalData(editor.getHTML());
    });
  });

  useEffect(() => {
    const id = setTimeout(() => {
      if (previous !== localData) {
        updateFn(localData);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [localData, previous, updateFn]);

  if (!editor) return null;

  const addImage = () => {
    window.api
      .sendMessage({
        type: "select-file",
        filter: "images",
      })
      .then((img) => {
        editor.commands.setImage({ src: img as string });
      });
  };
  return (
    <div
      style={{
        zIndex: 1000,
        position: "fixed",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        flex: 1,
        width: "100%",
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
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="Heading 1">
            <Typography {...chain("heading-1")} variant="button">
              <Heading1 />
            </Typography>
          </FormatButton>
          <FormatButton tooltip="Heading 2">
            <Typography {...chain("heading-2")} variant="button">
              <Heading2 />
            </Typography>
          </FormatButton>
          <FormatButton tooltip="Heading 3">
            <Typography {...chain("heading-3")} variant="button">
              <Heading3 />
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
          <FormatButton tooltip="Add image">
            <InsertPhoto onClick={() => addImage()} color="inherit" />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="Clear formatting">
            <FormatClear {...chain("clear-text")} />
          </FormatButton>
          <FormatButton tooltip="Unlink">
            <LinkOff {...chain("link")} />
          </FormatButton>
        </ToolbarIconsWrapper>

        <ToolbarIconsWrapper>
          <FormatButton tooltip="highlight">
            <Typography {...chain("highlight")}>
              <Highlighter size={21} />
            </Typography>
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
        </ToolbarIconsWrapper>
        <Link underline="none" sx={{ pl: 0.5 }}>
          <Count />
        </Link>
      </div>
    </div>
  );
}
