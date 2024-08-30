import { useContext } from "react";
import { ProjectListContext } from "./ProjectListContext";

export default function useProjectList() {
  return useContext(ProjectListContext);
}
