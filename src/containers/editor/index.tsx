import { EditorProvider } from "@tiptap/react";
import ToolBar from "./ToolBar";
import { Box, useTheme } from "@mui/material";
import { extensions } from "./extensions";
import { useEffect } from "react";
import useRouter from "@/context/router/useRouter";

// TODO
// Use dropdown to change between paragraphs and header (h1-h6)
// May be cut down the headers to 3
// Enable indenting

const content = `Initial content here`;

export default function Editor() {
  const theme = useTheme();
  const { isDirty, setIsDirty } = useRouter();

  useEffect(() => {
    document.querySelectorAll(".tiptap").forEach((el) => {
      el.addEventListener("input", () => {
        if (!isDirty) setIsDirty(true);
      });
    });
  }, [isDirty, setIsDirty]);

  return (
    <Box
      sx={{
        mb: 2,
        backgroundColor: theme.palette.grey[50],
        flex: 1,
      }}
    >
      <EditorProvider
        slotBefore={<ToolBar />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </Box>
  );
}
