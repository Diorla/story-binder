import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import useRouter from "@/context/router/useRouter";

export default function EmptyTemplate() {
  const { navigate } = useRouter();
  return (
    <div id="empty-template">
      <div
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        className="empty-template-wrapper"
      >
        <Typography variant="h5">No templates found</Typography>
        <Typography>
          Oops, where did all those template go? We need to create new template
        </Typography>
        <Button variant="outlined" onClick={() => navigate("template")}>
          New template
        </Button>
      </div>
    </div>
  );
}
