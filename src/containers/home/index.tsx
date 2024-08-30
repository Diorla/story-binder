import EmptyProject from "./empty-project";
import Projects from "./projects";
import useProjects from "./useProjects";

export default function Home() {
  const { projects } = useProjects();

  if (projects.length) return <Projects projects={projects} />;
  return <EmptyProject />;
}
