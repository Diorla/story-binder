import ProjectCard from "@/containers/home/ProjectCard";
import { Box } from "@mui/material";
import useHomeContext from "./useHomeContext";

export default function Projects() {
  const { projects } = useHomeContext();

  return (
    <Box sx={{ p: 1 }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {projects.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </Box>
    </Box>
  );
}
