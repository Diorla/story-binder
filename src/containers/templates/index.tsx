import Template from "@/types/Template";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import readTemplate from "./readTemplate";
import logError from "@/scripts/logError";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, Divider } from "@mui/material";
import useRouter from "@/context/router/useRouter";

export default function Templates() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const { navigate } = useRouter();

  useEffectOnce(() => {
    window.api
      .sendMessage({
        type: "read-directory",
        path: "./templates",
      })
      .then((val: { files: string[] }) => {
        readTemplate(val.files).then((list) => {
          setTemplates(list);
          setLoading(false);
        });
      })
      .catch((err) => {
        logError("templates", "useEffectOnce", err);
        setLoading(false);
      });
  });

  if (loading) return <div>Loading</div>;
  if (!templates.length)
    return (
      <div id="empty-template">
        <div
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          className="empty-template-wrapper"
        >
          <Typography variant="h5">No templates found</Typography>
          <Typography>
            Oops, where did all those template go? We need to create new
            template
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("create-template")}
          >
            New template
          </Button>
        </div>
      </div>
    );
  return (
    <div>
      <Box className="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">Templates</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate("create-template")}
          size="small"
        >
          New template
        </Button>
      </Box>
      <Box>
        {templates.map((template) => (
          <Card key={template.id} sx={{ maxWidth: 240, p: 0.5, m: 0.5 }}>
            <Typography>{template.name}</Typography>
            <Typography>{template.description}</Typography>
            <Divider />
            <Box className="row" sx={{ justifyContent: "space-between" }}>
              <Button color="error">Delete</Button>
              <Button onClick={() => navigate("create-template", template)}>
                Edit
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
}
