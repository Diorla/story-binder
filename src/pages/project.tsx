import Project from "@/containers/project";
import ProjectProvider from "@/containers/project/project-view/Provider";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";

export default function ProjectPage() {
  const { params } = useRouter<ProjectInfo>();
  if (params && params.name)
    return (
      <ProjectProvider projectInfo={params}>
        <Project />
      </ProjectProvider>
    );
  return <div>Project not found</div>;
}
