import ProjectInfo from "@/types/ProjectInfo";

export default interface HomeContextProps {
  projects: ProjectInfo[];
  reloadProjects: () => void;
}
