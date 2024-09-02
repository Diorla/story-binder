import { useEffect, useState } from "react";
import EmptyProject from "./empty-project";
import Projects from "./projects";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import logError from "@/scripts/logError";
import Directory from "@/types/Directory";

export default function Home() {
  const {
    userInfo: { workspace },
  } = useApp();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useLocalState(workspace, []);

  useEffect(() => {
    window.api
      ?.sendMessage({
        type: "read-directory",
        path: workspace,
      })
      .then((value: Directory) => {
        setProjects(value.folders);
        setLoading(false);
      })
      .catch((err) => {
        logError("Home", "useEffect", err);
        setLoading(false);
      });
  }, [setProjects, workspace]);

  if (loading) return <div>Loading</div>;
  if (projects.length) return <Projects projects={projects} />;
  return <EmptyProject />;
}
