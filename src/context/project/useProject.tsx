import { useContext } from "react";
import { ProjectContext } from ".";

export function useProject() {
  return useContext(ProjectContext);
}
