import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Editor from "../editor";
import useTemplateContext from "./useTemplateContext";
import Template from "@/types/Template";

export default function EditorWrapper({
  setIsSelect,
}: {
  setIsSelect: (value: boolean) => void;
}) {
  const { form, resetForm } = useTemplateContext();

  const updateEditor = (data: string) => {
    const value: Template = {
      ...form,
      type: "editor",
      content: data,
    };
    resetForm(value);
  };
  return (
    <Box className="editor-top" sx={{ width: "calc(100vw - 36px)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{form.name}</Typography>
        <Button onClick={() => setIsSelect(true)}>Change basic info</Button>
      </Box>
      <Editor updateFn={updateEditor} initialContent={form.content as string} />
    </Box>
  );
}
