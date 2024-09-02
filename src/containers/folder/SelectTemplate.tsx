import logError from "@/scripts/logError";
import useApp from "@/context/app/useApp";
import CollectionInfo from "@/types/CollectionInfo";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import { Box, Button, Link, Typography } from "@mui/material";
import Picker from "@/components/Picker";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import useRouter from "@/context/router/useRouter";
import getTemplates from "@/services/get-templates";
import Template from "@/types/Template";

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
  const [templateList, setTemplateList] = useState<Template[]>([]);
  const { navigate } = useRouter();

  useEffectOnce(() => {
    getTemplates()
      .then(setTemplateList)
      .then(() => setLoading(false));
  });

  useEffect(() => {
    setTemplateId(collection.template?.id || "");
  }, [collection.template?.id]);

  const submit = () => {
    if (templateId) {
      const path = `${dir.projectPath}/${dir.folderName}.${APP_FILE_EXT}`;
      const template = templateList.find((item) => item.id === templateId);
      const tempCollection: CollectionInfo = {
        ...collection,
        template,
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
        list={templateList.map((item) => {
          return {
            value: item.id,
            label: item.name,
            description: item.description,
          };
        })}
      />
      <Button onClick={submit}>Save</Button>
      <Typography>
        Don't find what you are looking for,{" "}
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => navigate("create-template")}
        >
          Create here
        </Link>{" "}
        to create more
      </Typography>
    </Box>
  );
}
