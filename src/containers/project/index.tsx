import { Box } from "@mui/material";
import ProjectView from "./ProjectView";
import { useEffect, useState } from "react";
import useLocalState from "@/hooks/useLocalState";
import ProjectInfo from "@/types/ProjectInfo";
import useRouter from "@/context/router/useRouter";
import useApp from "@/context/app/useApp";
import { ProjectContext } from "./ProjectContext";
import { defaultProject } from "./defaultProject";
import readCollectionList from "@/scripts/readCollectionList";
import FolderConfig from "@/types/FolderConfig";

export default function Project() {
  const [project, setProject] = useLocalState<ProjectInfo>(
    "project",
    defaultProject
  );
  const [loading, setLoading] = useState(true);
  const { params } = useRouter<{ dir: string[] }>();

  const {
    userInfo: { workspace },
  } = useApp();
  const path = `${workspace}/${params.dir.join("/")}`;
  const [collection, setCollection] = useLocalState<FolderConfig[]>(path, []);

  useEffect(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${path}/.config`,
      })
      .then((data) => setProject(data as ProjectInfo))
      .then(() => setLoading(false));
  }, [path, setProject]);

  useEffect(() => {
    readCollectionList(path).then((list) => {
      setCollection(list);
    });
  }, [path, setCollection]);

  const reload = () => {
    readCollectionList(path).then((list) => {
      setCollection(list);
    });
    window.api
      .sendMessage({
        type: "read-file",
        path: `${path}/.config`,
      })
      .then((data) => setProject(data as ProjectInfo));
  };

  if (loading) return <div>Loading</div>;
  return (
    <ProjectContext.Provider value={{ project, path, collection, reload }}>
      <Box>
        <ProjectView />
      </Box>
    </ProjectContext.Provider>
  );
}
