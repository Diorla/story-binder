/* eslint-disable max-lines */
import Picker from "@/components/Picker";
import useForm from "@/hooks/useForm";
import Template from "@/types/Template";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Editor from "../editor";
import { useState } from "react";
import Input from "@/components/Input";
import { v4 } from "uuid";
import { list } from "./list";
import formStyle from "./formStyle";
import useRouter from "@/context/router/useRouter";

export default function TemplateForm() {
  const { params } = useRouter<Template>();
  const [isSelect, setIsSelect] = useState(false);
  const { register, form, handleSubmit } = useForm<Template>({
    defaultValue: {
      id: "",
      type: "editor",
      description: "",
      template: "",
      ...params,
    },
    required: ["name"],
  });

  const submit = (data: Template) => {
    const id = data.id || v4();
    const value = {
      ...data,
      id,
    };
    window.api
      .sendMessage({
        type: "write-file",
        path: `./templates/${id}`,
        content: JSON.stringify(value, null, 2),
      })
      .then(() => register("id").onUpdate(id));
  };

  const updateEditor = (data: string) => {
    const value = {
      ...form,
      template: data,
    };
    window.api.sendMessage({
      type: "write-file",
      path: `./templates/${form.id}`,
      content: JSON.stringify(value, null, 2),
    });
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
      </Box>
    );

  if (form?.type === "form")
    return (
      <Box>
        <div>
          <Typography>{form.name}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setIsSelect(true)}>Change basic info</Button>
          </Box>
        </div>
        <Typography>Template editor</Typography>
      </Box>
    );
  if (form?.type === "editor")
    return (
      <Box className="editor-top">
        <div>
          <Typography>{form.name}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setIsSelect(true)}>Change basic info</Button>
          </Box>
        </div>
        <Editor updateFn={updateEditor} initialContent={form.template} />
      </Box>
    );
  return <div>No template</div>;
}
