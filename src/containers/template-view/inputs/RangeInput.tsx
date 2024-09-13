/* eslint-disable max-lines */
import Input from "@/components/Input";
import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import FormQuestion from "@/types/Template/FormQuestion";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import { numeric } from "./numeric";
import RangeTemplate from "@/types/Template/RangeTemplate";
import JSONParse from "@/scripts/JSONParse";
import validateRangeTemplate from "@/schema/validateRangeTemplate";

export default function RangeInput({
  questionItem,
  submit,
}: {
  questionItem: FormQuestion;
  submit: (value: FormQuestion) => void;
}) {
  const { moveUp, moveDown, deleteItem } = useTemplateContext();

  const answer = validateRangeTemplate(
    JSONParse<RangeTemplate>(questionItem.answer)
  );

  const isInteger = answer.isInteger;
  return (
    <Box sx={{ p: 2, border: "1px solid silver", m: 2 }}>
      <Typography variant="h5">Range</Typography>
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
      <Input
        sx={{ my: 2 }}
        label="Minimum value"
        value={answer.minValue}
        type="number"
        onChange={(e) => {
          submit({
            ...questionItem,
            answer: JSON.stringify({
              ...answer,
              minValue: numeric(e.target.value, isInteger),
            }),
          });
        }}
      />
      <Input
        label="Maximum value"
        value={answer.maxValue}
        type="number"
        onChange={(e) => {
          submit({
            ...questionItem,
            answer: JSON.stringify({
              ...answer,
              maxValue: numeric(e.target.value, isInteger),
            }),
          });
        }}
      />
      <FormControlLabel
        control={<Switch checked={isInteger} />}
        label="Whole number"
        onClick={() => {
          submit({
            ...questionItem,
            answer: JSON.stringify({
              ...answer,
              isInteger: !isInteger,
            }),
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
