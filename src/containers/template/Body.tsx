import { Box, Button } from "@mui/material";
import Input from "@/components/Input";
import { v4 } from "uuid";
import EditorWrapper from "./EditorWrapper";
import Template from "@/types/Template";
import { TemplatePath } from "./TemplatePath";
import useGenerator from "@/hooks/useGenerator";

export default function Body({
  form,
  path,
  register,
  handleSubmit,
  resetForm,
  setPath,
}: {
  form: Template;
  path: TemplatePath;
  register: (value: keyof Template) => object;
  handleSubmit: (callback: (data: Template) => void) => (e: unknown) => void;
  resetForm: (value?: Partial<Template>) => void;
  setPath: (path: TemplatePath) => void;
}) {
  const submit = (data: Template) => {
    const id = data.id || v4();
    const value = {
      ...data,
      id,
    };
    resetForm(value);
  };

  const { formattedText, generatedText, refresh } = useGenerator(form.content);

  if (!form.id || path === "info")
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          height: "calc(100vh - 76px)",
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input {...register("name")} sx={{ mb: 2 }} label="Name" />

          <Input
            {...register("description")}
            sx={{ mb: 2 }}
            label="Description"
            multiline
            rows={4}
          />
        </Box>
        {!form.id && (
          <Button
            onClick={handleSubmit((data) => {
              if (form.id) setPath("editor");
              submit(data);
            })}
          >
            Create
          </Button>
        )}
      </Box>
    );

  if (path === "test") {
    return (
      <div>
        <div className="flex justify-end ">
          <Button onClick={refresh}>Generate</Button>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: generatedText }}
          className="preview"
        />
      </div>
    );
  }
  if (path === "preview") {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: formattedText }}
        className="preview"
      />
    );
  }
  return <EditorWrapper />;
}
