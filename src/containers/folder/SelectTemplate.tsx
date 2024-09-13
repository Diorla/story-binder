import logError from "@/scripts/logError";
import Folder from "@/types/Folder";
import { Box, Button, Link, Typography } from "@mui/material";
import Picker from "@/components/Picker";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import useRouter from "@/context/router/useRouter";
import getTemplates from "@/scripts/get-templates";
import Template from "@/types/Template";
import useFolderContext from "./useFolderContext";
import { formStyle } from "./formStyle";
import JSONParse from "@/scripts/JSONParse";
import writeFolder from "@/scripts/writeFolder";

export default function SelectTemplate() {
  const { reload, currentDir } = useFolderContext();
  const [templateId, setTemplateId] = useState("");
  const [loading, setLoading] = useState(true);
  const [templateList, setTemplateList] = useState<Template[]>([]);
  const { navigate } = useRouter();
  const { folder } = useFolderContext();

  useEffectOnce(() => {
    getTemplates()
      .then(setTemplateList)
      .then(() => setLoading(false));
  });

  const template: Template = JSONParse(folder.template);

  useEffect(() => {
    setTemplateId(template.id || "");
  }, [template.id]);

  const submit = () => {
    if (templateId) {
      const template = templateList.find((item) => item.id === templateId);
      const tempFolder: Folder = {
        ...folder,
        template: JSON.stringify(template),
      };

      writeFolder(tempFolder, currentDir)
        .then(reload)
        .catch((err: Error) => {
          logError("update-folder", "submit", err);
        });
    }
  };

  const removeTemplate = () => {
    const tempFolder: Folder = {
      ...folder,
      template: "",
    };

    writeFolder(tempFolder, currentDir)
      .then(reload)
      .catch((err: Error) => {
        logError("update-folder", "remove-template", err);
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
