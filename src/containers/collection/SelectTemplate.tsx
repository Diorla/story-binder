import logError from "@/scripts/logError";
import Folder from "@/types/Folder";
import { Box, Button, Link, Typography } from "@mui/material";
import Picker from "@/components/Picker";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import useRouter from "@/context/router/useRouter";
import getTemplates from "@/services/get-templates";
import Template from "@/types/Template";
import useCollectionContext from "./useCollectionContext";
import writeCollection from "@/scripts/writeCollection";
import { formStyle } from "./formStyle";

export default function SelectTemplate() {
  const { reload, currentDir } = useCollectionContext();
  const [templateId, setTemplateId] = useState("");
  const [loading, setLoading] = useState(true);
  const [templateList, setTemplateList] = useState<Template[]>([]);
  const { navigate } = useRouter();
  const { collection } = useCollectionContext();

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
      const template = templateList.find((item) => item.id === templateId);
      const tempCollection: Folder = {
        ...collection,
        template,
      };

      writeCollection(tempCollection, currentDir)
        .then(reload)
        .catch((err) => {
          logError("update-collection", "submit", err);
        });
    }
  };

  const removeTemplate = () => {
    const tempCollection: Folder = {
      ...collection,
      template: undefined,
    };

    writeCollection(tempCollection, currentDir)
      .then(reload)
      .catch((err) => {
        logError("update-collection", "remove-template", err);
      });
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
      <Button onClick={removeTemplate}>Remove template</Button>
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
