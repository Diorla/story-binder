import ProjectFrame from "@/containers/project-frame";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";

export default function ProjectPage() {
  const { params } = useRouter<ProjectInfo>();
  if (params && params.name) return <ProjectFrame projectPath={params} />;
  return <div>Project not found</div>;
}
