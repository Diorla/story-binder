import EmptyProject from "@/containers/empty-project";
import Projects from "@/containers/projects";
import useProjectList from "@/context/projectList/useProjectList";

export default function Home() {
  const { projects } = useProjectList();

  if (projects.length) return <Projects projects={projects} />;
  return <EmptyProject />;
}
