import validateProject from "@/schema/validateProject";
import Project from "@/types/Project";

export default async function writeProject(
  project: Project,
  projectPath: string
) {
  const path = `${projectPath}/${project.id}`;
  await window.api.sendMessage({
    type: "create-directory",
    path,
  });
  return await window.api.sendMessage({
    type: "write-file",
    path: `${path}/.config`,
    content: validateProject(project),
  });
}
