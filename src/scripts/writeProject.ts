import validateProject from "@/schema/validateProject";
import Project from "@/types/Project";

export default async function writeProject(
  project: Project,
  workspace: string
) {
  const path = `${workspace}/${project.id}`;
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
