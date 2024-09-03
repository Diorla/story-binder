import Project from "@/containers/project";
import useRouter from "@/context/router/useRouter";

export default function ProjectPage() {
  const { params } = useRouter<{ dir: string[] }>();
  if (params.dir) return <Project />;
  return null;
}
