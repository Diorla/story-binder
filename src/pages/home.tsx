import EmptyProject from "@/containers/empty-project";
import useApp from "@/context/app/useApp";
import { useEffect } from "react";
import Projects from "@/containers/projects";
import useLocalState from "@/hooks/useLocalState";

export default function Home() {
  const {
    userInfo: { workspace },
  } = useApp();
  const [projects, setProjects] = useLocalState("project-list", []);
  const [loading, setLoading] = useLocalState("project-list-loading", true);
  useEffect(() => {
    setLoading(true);
    window.fs
      ?.sendMessage({
        type: "read-directory",
        dir: workspace,
      })
      .then((value: { files: string[]; folders: string[] }) => {
        setProjects(value.folders);
        setLoading(false);
      });
  }, [setLoading, setProjects, workspace]);

  if (loading) return <div>Loading</div>;
  if (projects.length) return <Projects projects={projects} />;
  return <EmptyProject />;
}
