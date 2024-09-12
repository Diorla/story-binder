import { Box, Button, Divider } from "@mui/material";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import Doc from "@/types/Doc";
import { v4 } from "uuid";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useFolderContext from "./useFolderContext";

export default function NewDocForm() {
  const {
    currentDir,
    folder: { template },
    reload,
  } = useFolderContext();
  const { register, handleSubmit } = useForm<Doc>({
    defaultValue: {
      name: "",
      note: "",
      id: "",
      template: "",
      content: "",
    },
    required: ["name"],
  });

  const writeDoc = (data: Doc) => {
    const id = v4();
    window.api
      .sendMessage({
        type: "write-file",
        path: `${currentDir}/${id}.${APP_FILE_EXT}`,
        content: { ...data, id, template },
      })
      .then(reload);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 1,
          maxWidth: 360,
          margin: "auto",
          backgroundColor: "background.paper",
        }}
      >
        <Input label="Name" {...register("name")} placeholder="Frodo" />
        <Input
          label="Note"
          {...register("note")}
          rows={5}
          multiline
          placeholder="The guy who would take the ring to mount doom"
        />
        <Button
          type="submit"
          onClick={handleSubmit((data) => {
            writeDoc(data);
          })}
        >
          Save Doc
        </Button>
      </Box>
      <Divider />
    </>
  );
}
