import Input from "@/components/Input";
import { Box, Button, IconButton, Typography } from "@mui/material";
import FormQuestion from "@/types/Template/FormQuestion";
import DataRenderer from "./DataRenderer";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import MultiSelectTemplate from "@/types/Template/MultiSelectTemplate";
import { numeric } from "./numeric";
import JSONParse from "@/scripts/JSONParse";
import validateMultiSelectTemplate from "@/schema/validateMultiSelectTemplate";

export default function MultipleSelectInput({
  questionItem,
  submit,
}: {
  questionItem: FormQuestion;
  submit: (value: FormQuestion) => void;
}) {
  const { moveUp, moveDown, deleteItem } = useTemplateContext();

  const answer = validateMultiSelectTemplate(
    JSONParse<MultiSelectTemplate>(questionItem.answer)
  );

  return (
    <Box sx={{ p: 2, border: "1px solid silver", m: 2 }}>
      <Typography variant="h5" sx={{ my: 1 }}>
        Select multiple
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
      <Input
        sx={{ my: 2 }}
        label="Minimum count"
        value={answer.minCount}
        type="number"
        onChange={(e) => {
          submit({
            ...questionItem,
            answer: JSON.stringify({
              ...answer,
              minCount: numeric(e.target.value, true),
            }),
          });
        }}
      />
      <Input
        label="Maximum count"
        value={answer.maxCount}
        type="number"
        onChange={(e) => {
          submit({
            ...questionItem,
            answer: JSON.stringify({
              ...answer,
              maxCount: numeric(e.target.value, true),
            }),
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
