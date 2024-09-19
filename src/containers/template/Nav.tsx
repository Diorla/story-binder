import { Box, IconButton, Typography } from "@mui/material";
import Template from "@/types/Template";
import {
  Edit,
  Info,
  PlayCircleFilled,
  RemoveRedEye,
} from "@mui/icons-material";
import { TemplatePath } from "./TemplatePath";

export default function Nav({
  form,
  setPath,
  path,
}: {
  form: Template;
  setPath: (path: TemplatePath) => void;
  path: TemplatePath;
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">{form.name}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          onClick={() => setPath("test")}
          color={path === "test" ? "primary" : "default"}
        >
          <PlayCircleFilled />
        </IconButton>
        <IconButton
          onClick={() => setPath("preview")}
          color={path === "preview" ? "primary" : "default"}
        >
          <RemoveRedEye />
        </IconButton>
        <IconButton
          onClick={() => setPath("editor")}
          color={path === "editor" ? "primary" : "default"}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => setPath("info")}
          color={path === "info" ? "primary" : "default"}
        >
          <Info />
        </IconButton>
      </Box>
    </Box>
  );
}
