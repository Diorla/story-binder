import Folder from "@/types/Folder";
import Project from "@/types/ProjectInfo";

export default interface ProjectContextProps {
  project: Project;
  path: string;
  folder: Folder[];
  reload: () => void;
}
