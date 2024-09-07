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
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import { numeric } from "./numeric";
import UnitTemplate from "@/types/Template/UnitTemplate";

export default function UnitInput({
  questionItem,
  submit,
}: {
  questionItem: TemplateFormContentType<UnitTemplate>;
  submit: (value: TemplateFormContentType<UnitTemplate>) => void;
}) {
  const { moveUp, moveDown, deleteItem } = useTemplateContext();
  const isInteger = questionItem.answer.isInteger;

  return (
    <Box sx={{ p: 2, border: "1px solid silver", m: 2 }}>
      <Typography variant="h5">Unit</Typography>
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
        label="Unit"
        value={questionItem.answer.unit}
        onChange={(e) => {
          submit({
            ...questionItem,
            answer: {
              ...questionItem.answer,
              unit: e.target.value,
            },
          });
        }}
      />
      <Input
        sx={{ my: 2 }}
        label="Minimum value"
        value={questionItem.answer.minValue}
        type="number"
        onChange={(e) => {
          submit({
            ...questionItem,
            answer: {
              ...questionItem.answer,
              minValue: numeric(e.target.value, isInteger),
            },
          });
        }}
      />
      <Input
        label="Maximum value"
        value={questionItem.answer.maxValue}
        type="number"
        onChange={(e) => {
          submit({
            ...questionItem,
            answer: {
              ...questionItem.answer,
              maxValue: numeric(e.target.value, isInteger),
            },
          });
        }}
      />
      <FormControlLabel
        control={<Switch checked={isInteger} />}
        label="Whole number"
        onClick={() => {
          submit({
            ...questionItem,
            answer: {
              ...questionItem.answer,
              isInteger: !isInteger,
            },
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
