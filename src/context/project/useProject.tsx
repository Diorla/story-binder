import { useContext } from "react";
import ProjectContext from "./ProjectContext";

export function useProject() {
  return useContext(ProjectContext);
}
