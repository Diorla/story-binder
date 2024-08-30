import ProjectCard from "@/components/ProjectCard";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import ProjectInfo from "@/types/ProjectInfo";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";

export default function Projects({ projects }: { projects: string[] }) {
  const [loading, setLoading] = useLocalState("projects-loading", true);
  const {
    userInfo: { workspace },
  } = useApp();
  const [projectList, setProjectList] = useLocalState("project-list", []);

  useEffect(() => {
    const getProjectList = async () => {
      const list = [];
      for (const project of projects) {
        const path = `${workspace}/${project}/.config`;
        const res = await window.api.sendMessage({
          type: "read-file",
          path,
        });

        const obj = JSON.parse(res as string);
        list.push({ ...obj, path: `${workspace}/${project}` });
      }
      return list;
    };
    getProjectList().then((res: ProjectInfo[]) => {
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
          justifyContent: "space-evenly",
        }}
      >
        {projectList.map((project, index) => {
          return <ProjectCard {...project} key={index} />;
        })}
      </Grid>
    </Box>
  );
}
