import logError from "@/scripts/logError";
import useApp from "@/context/app/useApp";
import CollectionInfo from "@/types/CollectionInfo";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import { Box, Button, Typography } from "@mui/material";
import Picker from "@/components/Picker";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import useRouter from "@/context/router/useRouter";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  p: 1,
  maxWidth: 360,
  margin: "auto",
  backgroundColor: "background.paper",
};
export default function SelectTemplate({
  collection,
}: {
  collection: CollectionInfo;
}) {
  const { dir, refresh } = useApp();
  const [templateId, setTemplateId] = useState("");
  const [loading, setLoading] = useState(true);
  const [templateList, setTemplateList] = useState<
    {
      value: string;
      label: string;
      description?: string;
    }[]
  >([]);
  const { navigate } = useRouter();

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-directory",
        path: `./templates`,
      })
      .then((data: { files: string[] }) => {
        /**
         * read template item to get id, name and description
         * note, template id will match template file name
         */
        const templateList = data.files.map((file) => {
          const [value, label, description] = file.split(".");
          return { value, label, description };
        });
        setTemplateList(templateList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  });

  const submit = () => {
    if (templateId) {
      const path = `${dir.projectPath}/${dir.folderName}.${APP_FILE_EXT}`;
      const tempCollection: CollectionInfo = {
        ...collection,
        template: {
          type: "editor",
          id: templateId,
          description: "",
          template: "",
        },
      };

      window.api
        .sendMessage({
          type: "write-file",
          path,
          content: JSON.stringify(tempCollection),
        })
        .then(refresh)
        .catch((err) => {
          logError("update-collection", "submit", err);
        });
    }
  };

  if (loading) return <div>Loading</div>;
  if (templateList.length === 0)
    return (
      <Box sx={formStyle}>
        <Typography sx={{ textAlign: "center" }}>No template found</Typography>
        <Button onClick={() => navigate("create-template")}>
          Create template
        </Button>
      </Box>
    );
  return (
    <Box sx={formStyle}>
      <Picker
        value={templateId}
        onUpdate={(value) => setTemplateId(value)}
        label={""}
        list={templateList}
      />
      <Button onClick={submit}>Save</Button>
    </Box>
  );
}
