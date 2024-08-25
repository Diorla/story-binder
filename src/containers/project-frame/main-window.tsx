import Box from "@mui/material/Box";
import { useProject } from "@/context/project/useProject";

export default function MainWindow() {
  const { project } = useProject();

  if (!project)
    return (
      <Box component="main" sx={{ flexGrow: 1 }}>
        Loading project
      </Box>
    );
  // if (selectedDocId.includes("template"))
  //   return (
  //     <Box component="main" sx={{ flexGrow: 1 }}>
  //       update document template
  //     </Box>
  //   );
  // if (selectedDocId)
  //   return (
  //     <Box component="main" sx={{ flexGrow: 1 }}>
  //       Update document: {selectedDocId}
  //     </Box>
  //   );

  // if (selectedCollection.length)
  //   return (
  //     <Box component="main" sx={{ flexGrow: 1 }}>
  //       Update last selected collection:{" "}
  //       {selectedCollection[selectedCollection.length - 1]}
  //     </Box>
  //   );
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      {project.name}
    </Box>
  );
}
