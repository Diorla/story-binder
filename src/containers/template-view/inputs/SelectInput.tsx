import Input from "@/components/Input";
import { Box, Button, IconButton, Typography } from "@mui/material";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import DataRenderer from "./DataRenderer";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import SelectTemplate from "@/types/Template/SelectTemplate";

export default function SelectInput({
  questionItem,
  submit,
}: {
  questionItem: TemplateFormContentType<SelectTemplate>;
  submit: (value: TemplateFormContentType<SelectTemplate>) => void;
}) {
  const { moveUp, moveDown, deleteItem } = useTemplateContext();
  return (
    <Box sx={{ p: 2, border: "1px solid silver", m: 2 }}>
      <Typography variant="h5" sx={{ my: 1 }}>
        Select
      </Typography>
      <Input
        label="Question"
        value={questionItem.question}
        onChange={(e) => {
          submit({
            ...questionItem,
            question: e.target.value,
          });
        }}
      />
      <Input
        sx={{ my: 1 }}
        label="Description"
        value={questionItem.description}
        onChange={(e) => {
          submit({
            ...questionItem,
            description: e.target.value,
          });
        }}
      />
      <DataRenderer
        value={questionItem.data || ""}
        setValue={(value) => {
          submit({
            ...questionItem,
            data: value,
          });
        }}
        type="list"
      />
      <Box className="row" sx={{ justifyContent: "center" }}>
        <IconButton onClick={() => moveUp(questionItem.id)}>
          <ArrowUpward />
        </IconButton>
        <Button color="error" onClick={() => deleteItem(questionItem.id)}>
          Delete
        </Button>
        <IconButton onClick={() => moveDown(questionItem.id)}>
          <ArrowDownward />
        </IconButton>
      </Box>
    </Box>
  );
}
