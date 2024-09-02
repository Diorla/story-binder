import { Box, Button, Divider } from "@mui/material";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import useApp from "@/context/app/useApp";
import DocumentInfo from "@/types/DocumentInfo";
import { v4 } from "uuid";
import CollectionInfo from "@/types/CollectionInfo";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function NewCollectionForm({
  collection,
}: {
  collection: CollectionInfo;
}) {
  const { dir, refresh } = useApp();
  const { register, handleSubmit } = useForm<DocumentInfo>({
    defaultValue: {
      name: "",
      note: "",
      id: v4(),
    },
    required: ["name"],
  });

  const writeDocument = (data: DocumentInfo) => {
    const tempCollection: CollectionInfo = { ...collection };
    const document = tempCollection?.document || {};
    const tempDocument = document[data.id] || {};

    tempCollection.document = {
      ...document,
      [data.id]: {
        ...tempDocument,
        ...data,
        template: tempCollection.template,
      },
    };

    window.api
      .sendMessage({
        type: "write-file",
        path: `${dir.projectPath}/${dir.collectionName}.${APP_FILE_EXT}`,
        content: JSON.stringify(tempCollection, null, 2),
      })
      .then(refresh);
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
            writeDocument(data);
          })}
        >
          Submit
        </Button>
      </Box>
      <Divider />
    </>
  );
}
