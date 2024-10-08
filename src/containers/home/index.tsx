import { useEffect, useState } from "react";
import EmptyProject from "./empty-project";
import Projects from "./projects";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import getProjectList from "./getProjectList";
import Project from "@/types/Project";
import { HomeContext } from "./HomeContext";

export default function Home() {
  const {
    userInfo: { projectPath },
  } = useApp();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useLocalState<Project[]>("project-list", []);

  useEffect(() => {
    getProjectList(projectPath).then((res: Project[]) => {
      setProjects(res);
      setLoading(false);
    });
  }, [setLoading, setProjects, projectPath]);

  const reloadProjects = () => {
    getProjectList(projectPath).then((res: Project[]) => {
      setProjects(res);
    });
  };
  if (loading) return <div>Loading</div>;

  return (
    <HomeContext.Provider value={{ projects, reloadProjects }}>
      {projects.length ? <Projects /> : <EmptyProject />}
    </HomeContext.Provider>
  );
}
