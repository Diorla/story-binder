import { Box } from "@mui/material";
import Editor from "../editor";
import useTemplateContext from "./useTemplateContext";
import Template from "@/types/Template";

export default function EditorWrapper() {
  const { form, resetForm } = useTemplateContext();

  const updateEditor = (data: string) => {
    const value: Template = {
      ...form,
      content: data,
    };
    resetForm(value);
  };

  return (
    <Box className="editor-top" sx={{ width: "calc(100vw - 36px)", top: 80 }}>
      <Editor updateFn={updateEditor} initialContent={form.content as string} />
    </Box>
  );
}
