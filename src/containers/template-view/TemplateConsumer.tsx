import Picker from "@/components/Picker";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Input from "@/components/Input";
import { v4 } from "uuid";
import { list } from "./list";
import formStyle from "./formStyle";
import EditorWrapper from "./EditorWrapper";
import useTemplateContext from "./useTemplateContext";
import FormWrapper from "./FormWrapper";
import Template from "@/types/Template";
import AnswerTemplate from "@/types/Template/AnswerTemplate";

export default function TemplateConsumer() {
  const [isSelect, setIsSelect] = useState(false);
  const { register, form, handleSubmit, resetForm } = useTemplateContext();

  const submit = (data: Template<AnswerTemplate>) => {
    const id = data.id || v4();
    const value = {
      ...data,
      id,
    };
    resetForm(value);
  };

  if (!form.id || isSelect)
    return (
      <Box sx={formStyle}>
        <Box
          sx={{
            width: 300,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input {...register("name")} sx={{ mb: 2 }} label="Name" />
          <Picker
            value={form?.type}
            label="Select template"
            list={list}
            onUpdate={(value) => {
              register("type").onUpdate(value);
            }}
          />
        </Box>
        <Button
          onClick={handleSubmit((data) => {
            if (form.id) setIsSelect(false);
            submit(data);
          })}
        >
          Save
        </Button>
        {form.id ? (
          <Button onClick={() => setIsSelect(false)}>Close</Button>
        ) : null}
      </Box>
    );

  if (form?.type === "form") return <FormWrapper setIsSelect={setIsSelect} />;

  return <EditorWrapper setIsSelect={setIsSelect} />;
}
