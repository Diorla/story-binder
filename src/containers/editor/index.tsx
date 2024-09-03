import { EditorProvider } from "@tiptap/react";
import ToolBar from "./ToolBar";
import { Box, useTheme } from "@mui/material";
import { extensions } from "./extensions";

export default function Editor({
  initialContent,
  updateFn,
}: {
  initialContent: string;
  updateFn: (value: string) => void;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 2,
        backgroundColor: theme.palette.grey[50],
        flex: 1,
      }}
    >
      <EditorProvider
        slotAfter={
          <ToolBar initialContent={initialContent} updateFn={updateFn} />
        }
        extensions={extensions}
        content={initialContent}
      ></EditorProvider>
    </Box>
  );
}
