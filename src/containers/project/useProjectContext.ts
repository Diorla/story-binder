import { useContext } from "react";
import { ProjectContext } from "./ProjectContext";

export default function useProjectContext() {
  return useContext(ProjectContext);
}
