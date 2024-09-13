import { Box } from "@mui/material";
import ProjectView from "./ProjectView";
import { useEffect, useState } from "react";
import useLocalState from "@/hooks/useLocalState";
import Project from "@/types/Project";
import useRouter from "@/context/router/useRouter";
import useApp from "@/context/app/useApp";
import { ProjectContext } from "./ProjectContext";
import { defaultProject } from "./defaultProject";
import readFolderList from "@/scripts/readFolderList";
import Folder from "@/types/Folder";
import validateProject from "@/schema/validateProject";

export default function ProjectContainer() {
  const [project, setProject] = useLocalState<Project>(
    "project",
    defaultProject
  );
  const [loading, setLoading] = useState(true);
  const { params } = useRouter<{ dir: string[] }>();

  const {
    userInfo: { projectPath },
  } = useApp();
  const path = `${projectPath}/${params.dir.join("/")}`;
  const [folder, setFolder] = useLocalState<Folder[]>(path, []);

  useEffect(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${path}/.config`,
      })
      .then((data) => setProject(validateProject(data as Project)))
      .then(() => setLoading(false));
  }, [path, setProject]);

  useEffect(() => {
    readFolderList(path).then((list) => {
      setFolder(list);
    });
  }, [path, setFolder]);

  const reload = () => {
    readFolderList(path).then((list) => {
      setFolder(list);
    });
    window.api
      .sendMessage({
        type: "read-file",
        path: `${path}/.config`,
      })
      .then((data) => setProject(validateProject(data as Project)));
  };

  if (loading) return <div>Loading</div>;
  return (
    <ProjectContext.Provider value={{ project, path, folder, reload }}>
      <Box>
        <ProjectView />
      </Box>
    </ProjectContext.Provider>
  );
}
