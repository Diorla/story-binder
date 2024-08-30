import { useEffect } from "react";
import { ExpandedCollection } from "./ProjectContextProps";
import ProjectInfo from "@/types/ProjectInfo";
import addCollection from "@/scripts/add-collection";
import useApp from "../app/useApp";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import useContextState from "@/hooks/useContextState";
import ProjectContext from "./ProjectContext";

const init = async (path: string) => {
  const data = await window.api.sendMessage({
    type: "read-directory",
    path,
  });
  const { files, folders } = data as { files: string[]; folders: string[] };
  return { files, folders };
};
export default function ProjectProvider({
  children,
  projectInfo,
}: {
  children: React.ReactNode;
  projectInfo: ProjectInfo;
}) {
  const {
    userInfo: { workspace },
  } = useApp();
  const [project, setProject] = useContextState("project-info", projectInfo);
  const [collection, setCollection] = useContextState("project-collection", []);
  const [selected, setSelected] = useContextState<{
    type: "project" | "collection" | "document";
    name: string;
  }>("selected-sidebar", {
    type: "project",
    name: "",
  });
  const [expandedCollection, setExpandedCollection] =
    useContextState<ExpandedCollection>("expanded-sidebar", {});

  const updateProject = (currentProject: Partial<ProjectInfo>) => {
    setProject({ ...project, ...currentProject });
  };

  const createCollection = (collectionName: string) => {
    addCollection(workspace, project.name, collectionName).then(
      (newCollection) => {
        setCollection(
          [...collection, newCollection].sort((a, b) => (a > b ? 1 : -1))
        );
      }
    );
  };

  const toggleExpanded = (name: string) => {
    if (expandedCollection[name]) {
      const temp = { ...expandedCollection };
      delete temp[name];
      setExpandedCollection(temp);
      return;
    }
    window.api
      .sendMessage({
        type: "read-directory",
        path: `${workspace}/${project.name}.${APP_FILE_EXT}/${name}`,
      })
      .then((res: { files: string[]; folders: string[] }) => {
        const files = res.files.filter((item) => item !== ".template");
        setExpandedCollection({
          ...expandedCollection,
          [name]: files,
        });
      });
  };

  useEffect(() => {
    init(`${workspace}/${project.name}`).then(({ folders }) => {
      setCollection(folders);
    });
  }, [project, setCollection, workspace]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        updateProject,
        createCollection,
        collection,
        selected,
        setSelected,
        expandedCollection,
        toggleExpanded,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
