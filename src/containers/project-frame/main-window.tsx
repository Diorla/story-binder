import Box from "@mui/material/Box";
import { useProject } from "@/context/project/useProject";
import EditProject from "./edit-project";

export default function MainWindow() {
  const { project, selected } = useProject();

  if (!project)
    return (
      <Box component="main" sx={{ flexGrow: 1 }}>
        Loading project
      </Box>
    );
  if (selected.type === "collection")
    return (
      <Box component="main" sx={{ flexGrow: 1 }}>
        update collection template: {selected.name}
      </Box>
    );
  if (selected.type === "document")
    return (
      <Box component="main" sx={{ flexGrow: 1 }}>
        update document template: {selected.name}
      </Box>
    );
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <EditProject project={project} />
    </Box>
  );
}
