import { EditorType } from "@/types/Template";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Editor from "../editor";

export default function EditorTemplate({
  updateEditor,
  form,
  setIsSelect,
}: {
  updateEditor: (value: string) => void;
  form: EditorType;
  setIsSelect: (value: boolean) => void;
}) {
  return (
    <Box className="editor-top" sx={{ width: "calc(100vw - 36px)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{form.name}</Typography>
        <Button onClick={() => setIsSelect(true)}>Change basic info</Button>
      </Box>
      <Editor updateFn={updateEditor} initialContent={form.template} />
    </Box>
  );
}
