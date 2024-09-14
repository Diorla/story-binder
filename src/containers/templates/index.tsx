import Template from "@/types/Template";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, Divider } from "@mui/material";
import useRouter from "@/context/router/useRouter";
import getTemplates from "@/scripts/get-templates";
import EmptyTemplate from "./EmptyTemplate";
import useApp from "@/context/app/useApp";

export default function Templates() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const { navigate } = useRouter();
  const {
    userInfo: { templatePath },
  } = useApp();

  useEffectOnce(() => {
    getTemplates(templatePath).then((list) => {
      setTemplates(list);
      setLoading(false);
    });
  });

  const refresh = () => {
    getTemplates(templatePath).then((list) => {
      setTemplates(list);
    });
  };

  if (loading) return <div>Loading</div>;
  if (!templates.length) return <EmptyTemplate />;
  return (
    <div>
      <div className="flex flex-row justify-between items-center pl-1">
        <Typography variant="h6">Templates</Typography>
        <Button onClick={() => navigate("template")}>New template</Button>
      </div>
      <Divider />
      <div className="flex flex-row flex-wrap">
        {templates.map((template) => (
          <Card
            key={template.id}
            sx={{
              width: 240,
              p: 0.5,
              m: 0.5,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div>
              <Typography>{template.name}</Typography>
              <Divider />
              <Typography>{template.description}</Typography>
            </div>
            <div>
              <Box className="row" sx={{ justifyContent: "space-between" }}>
                <Button
                  color="error"
                  onClick={() => {
                    window.api
                      .sendMessage({
                        type: "delete-file",
                        path: `${templatePath}/${template.id}`,
                      })
                      .then(refresh);
                  }}
                >
                  Delete
                </Button>
                <Button onClick={() => navigate("template", template)}>
                  Edit
                </Button>
              </Box>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
