import { EditorProvider } from "@tiptap/react";
import ToolBar from "./ToolBar";
import { Box, useTheme } from "@mui/material";
import { extensions } from "./extensions";
import useRouter from "@/context/router/useRouter";
import { useEffectOnce } from "react-use";
import Template from "@/types/Template";

export default function Editor({ template }: { template: Template }) {
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
        slotAfter={<ToolBar template={template} />}
        extensions={extensions}
        content={template.template}
      ></EditorProvider>
    </Box>
  );
}
