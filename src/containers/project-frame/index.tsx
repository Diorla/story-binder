import ProjectProvider from "@/context/project";
import MainWindow from "./main-window";
import Sidebar from "./sidebar";
import ProjectInfo from "@/types/ProjectInfo";
import useLocalState from "@/hooks/useLocalState";

export default function ProjectFrame({
  projectPath,
}: {
  projectPath: ProjectInfo;
}) {
  const [expanded, setExpanded] = useLocalState("project-frame-expanded", true);
  const toggleDrawer = () => {
    setExpanded(!expanded);
  };
  const marginLeft = expanded ? 180 : 40;
  return (
    <ProjectProvider projectInfo={projectPath}>
      <Sidebar expanded={expanded} toggleDrawer={toggleDrawer} />
      <div style={{ marginLeft, transition: "margin 0.3s ease-in-out" }}>
        <MainWindow />
      </div>
    </ProjectProvider>
  );
}
