import validateProject from "@/schema/validateProject";
import Project from "@/types/Project";
import { v4 } from "uuid";

export default async function duplicateProject(
  projectInfo: Project,
  projectPath: string
) {
  const newId = v4();
  const path = `${projectPath}/${projectInfo.id}`;
  const newPath = `${projectPath}/${newId}`;

  await window.api.sendMessage({
    type: "duplicate-directory",
    path: `${path}`,
    newPath,
  });

  await window.api.sendMessage({
    type: "write-file",
    path: `${newPath}/.config`,
    content: validateProject({ ...projectInfo, id: newId }),
  });
  return true;
}
