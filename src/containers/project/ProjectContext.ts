import { createContext } from "react";
import ProjectContextProps from "./ProjectContextProps";
import { defaultProject } from "./defaultProject";

export const ProjectContext = createContext<ProjectContextProps>({
  project: defaultProject,
  path: "",
  folder: [],
  reload: () => "",
});
