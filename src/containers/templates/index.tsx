import Template from "@/types/Template";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, Divider } from "@mui/material";
import useRouter from "@/context/router/useRouter";
import getTemplates from "@/services/get-templates";
import useApp from "@/context/app/useApp";

export default function Templates() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const { navigate } = useRouter();
  const { refresh } = useApp();

  useEffectOnce(() => {
    getTemplates().then((list) => {
      setTemplates(list);
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
      <Divider sx={{ my: 1 }} />
      <Box className="row">
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
                        path: `./templates/${template.id}`,
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
