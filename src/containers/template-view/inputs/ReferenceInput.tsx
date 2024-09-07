import Input from "@/components/Input";
import { Box, Button, IconButton, Typography } from "@mui/material";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import ReferenceTemplate from "@/types/Template/ReferenceTemplate";
import { useState } from "react";
import Template from "@/types/Template";
import AnswerTemplate from "@/types/Template/AnswerTemplate";
import { useEffectOnce } from "react-use";
import getTemplates from "@/services/get-templates";
import Picker from "@/components/Picker";

export default function ReferenceInput({
  questionItem,
  submit,
}: {
  questionItem: TemplateFormContentType<ReferenceTemplate>;
  submit: (value: TemplateFormContentType<ReferenceTemplate>) => void;
}) {
  const [templateList, setTemplateList] = useState<Template<AnswerTemplate>[]>(
    []
  );

  useEffectOnce(() => {
    getTemplates().then(setTemplateList);
  });
  const { moveUp, moveDown, deleteItem } = useTemplateContext();
  return (
    <Box sx={{ p: 2, border: "1px solid silver", m: 2 }}>
      <Typography variant="h5" sx={{ my: 1 }}>
        Reference
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
      <Picker
        value={questionItem.answer.templateId}
        onUpdate={(value) => {
          submit({
            ...questionItem,
            answer: {
              ...questionItem.answer,
              templateId: value,
            },
          });
        }}
        label="Template referenced"
        list={templateList.map((item) => {
          return {
            value: item.id,
            label: item.name,
            description: item.description,
          };
        })}
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
