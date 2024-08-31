import Project from "@/containers/project";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";
import { useEffectOnce } from "react-use";

export default function ProjectPage() {
  const { updateDir } = useApp();
  const { params } = useRouter<ProjectInfo>();
  useEffectOnce(() => {
    updateDir("projectPath", params.path);
  });

  return <Project />;
}
