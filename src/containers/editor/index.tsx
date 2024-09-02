import { EditorProvider } from "@tiptap/react";
import ToolBar from "./ToolBar";
import { Box, useTheme } from "@mui/material";
import { extensions } from "./extensions";
import useRouter from "@/context/router/useRouter";
import { useEffectOnce } from "react-use";

export default function Editor({
  initialContent,
  updateFn,
}: {
  initialContent: string;
  updateFn: (value: string) => void;
}) {
  const theme = useTheme();
  const { isDirty, setIsDirty } = useRouter();

  useEffectOnce(() => {
    document.querySelectorAll(".tiptap").forEach((el) => {
      el.addEventListener("input", () => {
        if (!isDirty) setIsDirty(true);
      });
    });
  });

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
