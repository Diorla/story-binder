import EmptyProject from "@/containers/empty-project";
import useApp from "@/context/app/useApp";
import { useEffect } from "react";
import Projects from "@/containers/projects";
import useLocalState from "@/hooks/useLocalState";
import logError from "@/scripts/logError";

export default function Home() {
  const {
    userInfo: { workspace },
  } = useApp();
  const [projects, setProjects] = useLocalState("project-list", []);
  const [loading, setLoading] = useLocalState("project-list-loading", true);
  useEffect(() => {
    setLoading(true);
    window.api
      ?.sendMessage({
        type: "read-directory",
        path: workspace,
      })
      .then((value: { files: string[]; folders: string[] }) => {
        setProjects(value.folders.map((item) => `${workspace}/${item}`));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        logError("Home", "useEffect", err);
      });
  }, [setLoading, setProjects, workspace]);

  if (loading) return <div>Loading</div>;
  if (projects.length) return <Projects projects={projects} />;
  return <EmptyProject />;
}
