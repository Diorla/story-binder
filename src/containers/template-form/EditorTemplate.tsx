import { EditorType } from "@/types/Template";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Editor from "../editor";
import useTemplateContext from "./useTemplateContext";

export default function EditorTemplate({
  setIsSelect,
}: {
  setIsSelect: (value: boolean) => void;
}) {
  const { form, resetForm } = useTemplateContext();

  const updateEditor = (data: string) => {
    const value: EditorType = {
      ...form,
      type: "editor",
      template: data,
    };
    resetForm(value);
  };
  return (
    <Box className="editor-top" sx={{ width: "calc(100vw - 36px)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{form.name}</Typography>
        <Button onClick={() => setIsSelect(true)}>Change basic info</Button>
      </Box>
      <Editor
        updateFn={updateEditor}
        initialContent={form.template as string}
      />
    </Box>
  );
}
