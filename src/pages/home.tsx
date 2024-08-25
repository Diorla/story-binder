import EmptyProject from "@/containers/empty-project";
import useApp from "@/context/app/useApp";
import { useEffect, useState } from "react";
import Projects from "@/containers/projects";

export default function Home() {
  const { projectDir } = useApp();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.fs
      ?.sendMessage({
        type: "read-directory",
        dir: projectDir,
      })
      .then((value: { files: string[]; folders: string[] }) => {
        setProjects(value.folders);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading</div>;
  if (projects.length) return <Projects projects={projects} />;
  return <EmptyProject />;
}
