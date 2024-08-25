import { useProject } from "@/context/project/useProject";
import Typography from "@mui/material/Typography";

export default function ProjectButton() {
  const { project, setSelected } = useProject();
  return (
    <Typography
      sx={{
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      onClick={() =>
        setSelected({
          type: "project",
          name: project.name,
        })
      }
    >
      {project.name}
    </Typography>
  );
}
