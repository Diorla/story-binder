import ProjectProvider from "@/context/project";
import MainWindow from "./main-window";
import ProjectInfo from "@/types/ProjectInfo";

export default function ProjectFrame({
  projectPath,
}: {
  projectPath: ProjectInfo;
}) {
  return (
    <ProjectProvider projectInfo={projectPath}>
      <MainWindow />
    </ProjectProvider>
  );
}
