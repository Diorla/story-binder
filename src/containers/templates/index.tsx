import Template from "@/types/Template";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import readTemplate from "./readTemplate";
import logError from "@/scripts/logError";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
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
      <h1>Templates</h1>
    </div>
  );
}
