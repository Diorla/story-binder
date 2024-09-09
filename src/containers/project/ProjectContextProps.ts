import FolderConfig from "@/types/FolderConfig";
import ProjectInfo from "@/types/ProjectInfo";

export default interface ProjectContextProps {
  project: ProjectInfo;
  path: string;
  collection: FolderConfig[];
  reload: () => void;
}
