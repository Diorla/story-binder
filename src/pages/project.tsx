import Project from "@/containers/project";
import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import ProjectInfo from "@/types/ProjectInfo";
import { useState } from "react";
import { useEffectOnce } from "react-use";

export default function ProjectPage() {
  const { updateDir } = useApp();
  const { params } = useRouter<ProjectInfo>();
  const [loading, setLoading] = useState(true);
  useEffectOnce(() => {
    updateDir("projectPath", params.path);
    setLoading(false);
  });

  if (loading) return <div>Loading</div>;
  return <Project />;
}
