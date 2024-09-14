import Input from "@/components/Input";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FormQuestion from "@/types/Template/FormQuestion";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import TimeTemplate from "@/types/Template/TimeTemplate";
import JSONParse from "@/scripts/JSONParse";
import validateTimeTemplate from "@/schema/validateTimeTemplate";
import TimePicker from "@/components/TimePicker";

export default function TimeInput({
  questionItem,
  submit,
}: {
  questionItem: FormQuestion;
  submit: (value: FormQuestion) => void;
}) {
  const { moveUp, moveDown, deleteItem } = useTemplateContext();

  const answer = validateTimeTemplate(
    JSONParse<TimeTemplate>(questionItem.answer)
  );

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
        <TimePicker
          label="Minimum time"
          value={answer.minValue}
          setTime={(value) => {
            submit({
              ...questionItem,
              answer: JSON.stringify({
                ...answer,
                minValue: value,
              }),
            });
          }}
        />
        <TimePicker
          label="Maximum time"
          value={answer.maxValue}
          setTime={(value) => {
            submit({
              ...questionItem,
              answer: JSON.stringify({
                ...answer,
                maxValue: value,
              }),
            });
          }}
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
