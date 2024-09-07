import Input from "@/components/Input";
import { Box, Typography, Button, IconButton } from "@mui/material";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import { format, set } from "date-fns";
import TimeTemplate from "@/types/Template/TimeTemplate";

export default function TimeInput({
  questionItem,
  submit,
}: {
  questionItem: TemplateFormContentType<TimeTemplate>;
  submit: (value: TemplateFormContentType<TimeTemplate>) => void;
}) {
  const { moveUp, moveDown, deleteItem } = useTemplateContext();
  return (
    <Box sx={{ p: 2, border: "1px solid silver", m: 2 }}>
      <Typography variant="h5">Time</Typography>
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
          label="Minimum time"
          type="time"
          value={format(questionItem.answer.minValue, "HH:mm")}
          onChange={(e) => {
            const [h, m] = e.target.value.split(":").map(Number);
            const val = set(questionItem.answer.minValue, {
              hours: h,
              minutes: m,
            });
            submit({
              ...questionItem,
              answer: {
                ...questionItem.answer,
                minValue: +val,
              },
            });
          }}
          sx={{ mr: 2 }}
        />
        <Input
          label="Maximum time"
          type="time"
          value={format(questionItem.answer.maxValue, "HH:mm")}
          onChange={(e) => {
            const [h, m] = e.target.value.split(":").map(Number);
            const val = set(questionItem.answer.minValue, {
              hours: h,
              minutes: m,
            });
            submit({
              ...questionItem,
              answer: {
                ...questionItem.answer,
                maxValue: +val,
              },
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
