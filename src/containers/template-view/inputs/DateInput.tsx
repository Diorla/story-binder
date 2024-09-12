import Input from "@/components/Input";
import { Box, Typography, Button, IconButton } from "@mui/material";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import DateTemplate from "@/types/Template/DateTemplate";
import { format } from "date-fns";
import validateDateTemplate from "@/schema/validateDateTemplate";

export default function DateInput({
  questionItem,
  submit,
}: {
  questionItem: TemplateFormContentType;
  submit: (value: TemplateFormContentType) => void;
}) {
  const { moveUp, moveDown, deleteItem } = useTemplateContext();
  const answer: DateTemplate = validateDateTemplate(
    JSON.parse(questionItem.answer)
  );
  return (
    <Box sx={{ p: 2, border: "1px solid silver", m: 2 }}>
      <Typography variant="h5">Date</Typography>
      <Input
        sx={{ my: 2 }}
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
        label="Description"
        value={questionItem.description}
        onChange={(e) => {
          submit({
            ...questionItem,
            description: e.target.value,
          });
        }}
      />
      <Box className="row" sx={{ my: 2 }}>
        <Input
          label="Minimum date"
          type="date"
          value={format(answer.minValue, "yyyy-MM-dd")}
          onChange={(e) => {
            submit({
              ...questionItem,
              answer: JSON.stringify({
                ...answer,
                minValue: +new Date(e.target.value),
              }),
            });
          }}
          sx={{ mr: 2 }}
        />
        <Input
          label="Maximum date"
          type="date"
          value={format(answer.maxValue, "yyyy-MM-dd")}
          onChange={(e) => {
            submit({
              ...questionItem,
              answer: JSON.stringify({
                ...answer,
                maxValue: +new Date(e.target.value),
              }),
            });
          }}
          sx={{ ml: 2 }}
        />
      </Box>
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
