import { Box, Button, Divider } from "@mui/material";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import writeCollection from "./writeCollection";
import useApp from "@/context/app/useApp";
import FolderConfig from "@/types/FolderConfig";
import { v4 } from "uuid";

export default function NewCollectionForm() {
  const { dir, refresh } = useApp();
  const { register, handleSubmit } = useForm<FolderConfig>({
    defaultValue: {
      name: "",
      note: "",
      id: v4(),
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
            writeCollection(data, dir.projectPath).then(() => {
              refresh();
            });
          })}
        >
          Submit
        </Button>
      </Box>
      <Divider />
    </>
  );
}
