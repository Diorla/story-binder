import { Box, Button, Divider } from "@mui/material";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import Doc from "@/types/Doc";
import { v4 } from "uuid";
import useFolderContext from "./useFolderContext";
import writeDoc from "@/scripts/writeDoc";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function NewDocForm({
  closeFolder,
}: {
  closeFolder?: () => void;
}) {
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

  const submit = (data: Doc) => {
    const id = v4();
    const path = `${currentDir}/${id}.${APP_FILE_EXT}`;
    const content = { ...data, id, template };
    writeDoc(content, path).then(closeFolder).then(reload);
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
            submit(data);
          })}
        >
          Save Doc
        </Button>
      </Box>
      <Divider />
    </>
  );
}
