import { EditorProvider } from "@tiptap/react";
import MenuBar from "./MenuBar";
import { Box, useTheme } from "@mui/material";
import { extensions } from "./extensions";
import Count from "./Count";

// TODO
// Use dropdown to change between paragraphs and header (h1-h6)
// May be cut down the headers to 3
// Enable indenting

const content = `Initial content here`;

export default function Editor() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mb: 2,
        backgroundColor: theme.palette.grey[50],
        flex: 1,
        minHeight: "calc(100vh - 50px)",
      }}
    >
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        slotAfter={<Count />}
      ></EditorProvider>
    </Box>
  );
}
