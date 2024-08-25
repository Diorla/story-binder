import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";

export default function useOpenProject() {
  const { navigate } = useRouter<ProjectInfo>();

  const openProject = (projectInfo: ProjectInfo) => {
    navigate("project", projectInfo);
  };
  return openProject;
}
