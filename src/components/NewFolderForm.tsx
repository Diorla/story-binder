import { Box, Button, Divider } from "@mui/material";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import createFolder from "@/scripts/createFolder";
import useApp from "@/context/app/useApp";
import Folder from "@/types/Folder";
import { v4 } from "uuid";

export default function NewFolderForm({
  currentDir,
  template,
}: {
  currentDir: string;
  template?: string;
}) {
  const { refresh } = useApp();
  const { register, handleSubmit } = useForm<Folder>({
    defaultValue: {
      name: "",
      note: "",
      id: v4(),
      template: template || "",
    },
    required: ["name"],
  });

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
        <Input label="Name" {...register("name")} placeholder="Characters" />
        <Input
          label="Note"
          {...register("note")}
          rows={5}
          multiline
          placeholder="The people in the narration"
        />
        <Button
          type="submit"
          onClick={handleSubmit((data) => {
            if (data)
              createFolder({ ...data }, currentDir).then(() => {
                refresh();
              });
          })}
        >
          Save folder
        </Button>
      </Box>
      <Divider />
    </>
  );
}
