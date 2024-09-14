import Folder from "@/types/Folder";
import Project from "@/types/Project";

export default interface ProjectContextProps {
  project: Project;
  path: string;
  folder: Folder[];
  reload: () => void;
}
