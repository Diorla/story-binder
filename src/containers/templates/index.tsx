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
      <Divider sx={{ my: 1 }} />
      <Box className="row" sx={{ flexWrap: "wrap" }}>
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
              <Typography>{template.description}</Typography>
            </div>
            <div>
              <Divider />
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
                <Button onClick={() => navigate("create-template", template)}>
                  Edit
                </Button>
              </Box>
            </div>
          </Card>
        ))}
      </Box>
    </div>
  );
}
