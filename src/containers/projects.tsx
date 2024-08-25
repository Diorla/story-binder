import ProjectCard from "@/components/ProjectCard";
import useApp from "@/context/app/useApp";
import ProjectInfo from "@/types/ProjectInfo";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Projects({ projects }: { projects: string[] }) {
  const [loading, setLoading] = useState(true);
  const { projectDir } = useApp();
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const getProjectInfo = async () => {
      const list = [];
      for (const project of projects) {
        const dir = `${projectDir}/${project}/.config`;
        const res = await window.fs.sendMessage({
          type: "read-file",
          dir,
        });

        list.push(JSON.parse(res as string));
      }
      return list;
    };
    getProjectInfo().then((res: ProjectInfo[]) => {
      setProjectList(res);
      setLoading(false);
    });
  }, [projects.length]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Projects
      </Typography>
      {projectList.map((project, index) => {
        return <ProjectCard {...project} key={index} />;
      })}
    </Box>
  );
}
