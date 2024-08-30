import Home from "@/containers/home";
import ProjectListProvider from "@/context/projectList";

export default function HomePage() {
  return (
    <ProjectListProvider>
      <Home />
    </ProjectListProvider>
  );
}
