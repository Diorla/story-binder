import Project from "@/types/Project";

export default interface HomeContextProps {
  projects: Project[];
  reloadProjects: () => void;
}
