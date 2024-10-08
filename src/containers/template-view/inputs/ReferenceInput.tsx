import Input from "@/components/Input";
import { Box, Button, IconButton, Typography } from "@mui/material";
import FormQuestion from "@/types/Template/FormQuestion";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useTemplateContext from "../useTemplateContext";
import ReferenceTemplate from "@/types/Template/ReferenceTemplate";
import { useState } from "react";
import Template from "@/types/Template";
import { useEffectOnce } from "react-use";
import getTemplates from "@/scripts/get-templates";
import Picker from "@/components/Picker";
import JSONParse from "@/scripts/JSONParse";
import validateReferenceTemplate from "@/schema/validateReferenceTemplate";
import useApp from "@/context/app/useApp";

export default function ReferenceInput({
  questionItem,
  submit,
}: {
  questionItem: FormQuestion;
  submit: (value: FormQuestion) => void;
}) {
  const [templateList, setTemplateList] = useState<Template[]>([]);
  const {
    userInfo: { templatePath },
  } = useApp();

  useEffectOnce(() => {
    getTemplates(templatePath).then(setTemplateList);
  });
  const { moveUp, moveDown, deleteItem } = useTemplateContext();

  const answer = validateReferenceTemplate(
    JSONParse<ReferenceTemplate>(questionItem.answer)
  );

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
        value={answer.templateId}
        onUpdate={(value) => {
          submit({
            ...questionItem,
            answer: JSON.stringify({
              ...answer,
              templateId: value,
            }),
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
