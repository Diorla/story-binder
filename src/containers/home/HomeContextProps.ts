import Project from "@/types/ProjectInfo";

export default interface HomeContextProps {
  projects: Project[];
  reloadProjects: () => void;
}
