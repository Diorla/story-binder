import { createContext, useEffect, useState } from "react";
import ProjectContextProps from "./ProjectContextProps";
import ProjectInfo from "@/types/ProjectInfo";
import addCollection from "@/scripts/add-collection";
import useApp from "../app/useApp";

export const ProjectContext = createContext<ProjectContextProps>({
  project: null,
  updateProject: () => "{}",
  createCollection: () => "{}",
});

export default function ProjectProvider({
  children,
  projectInfo,
}: {
  children: React.ReactNode;
  projectInfo: ProjectInfo;
}) {
  const { workspace } = useApp();
  const [project, setProject] = useState({
    ...projectInfo,
    collection: {},
  });

  const updateProject = (currentProject: Partial<ProjectInfo>) => {
    setProject({ ...project, ...currentProject });
  };

  const createCollection = (collectionName: string) => {
    addCollection(workspace, project.name, collectionName);
    // console.log("project", project);
    // console.log(collectionName);
  };
  useEffect(() => {
    // const fetchDirectory = (path: string): Project => {
    //   // this will fetch the content of the particular dir
    //   if (!path === null) project;
    //   return {
    //     ...project,
    //     collection: {},
    //   };
    // };
    // const project = fetchDirectory(projectInfo.name);
    // setProject(project);
  }, []);

  // const toggleItem = (item: string) => {
  //   if (selectedCollection.includes(item)) {
  //     setSelectedCollection(selectedCollection.filter((i) => i !== item));
  //   } else {
  //     setSelectedCollection([...selectedCollection, item]);
  //   }
  // };

  // const reset = () => {
  //   setSelectedDocId("");
  //   setSelectedCollection([]);
  // };

  return (
    <ProjectContext.Provider
      value={{
        project,
        updateProject,
        createCollection,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
