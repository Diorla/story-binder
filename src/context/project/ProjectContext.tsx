import { createContext } from "react";
import ProjectContextProps from "./ProjectContextProps";

const ProjectContext = createContext<ProjectContextProps>({
  project: null,
  updateProject: null,
  createCollection: null,
  collection: [],
  selected: null,
  setSelected: null,
  expandedCollection: null,
  toggleExpanded: null,
});

export default ProjectContext;
