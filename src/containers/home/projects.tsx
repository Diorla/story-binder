import ProjectCard from "@/containers/home/ProjectCard";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import ProjectInfo from "@/types/ProjectInfo";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import getProjectList from "./getProjectList";

export default function Projects({ projects }: { projects: string[] }) {
  const [loading, setLoading] = useLocalState("projects-loading", true);

  const {
    userInfo: { workspace },
  } = useApp();
  const [projectList, setProjectList] = useLocalState("project-list", []);

  useEffect(() => {
    getProjectList(projects, workspace).then((res: ProjectInfo[]) => {
      setProjectList(res);
      setLoading(false);
    });
  }, [projects, setLoading, setProjectList, workspace]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ p: 1 }}>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {projectList.map((project, index) => {
          return <ProjectCard project={project} key={index} />;
        })}
      </Grid>
    </Box>
  );
}
