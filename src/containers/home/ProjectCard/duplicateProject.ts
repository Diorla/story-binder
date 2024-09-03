import ProjectInfo from "@/types/ProjectInfo";
import { v4 } from "uuid";

export default async function duplicateProject(
  projectInfo: ProjectInfo,
  workspace: string
) {
  const newId = v4();
  const path = `${workspace}/${projectInfo.id}`;
  const newPath = `${workspace}/${newId}`;

  await window.api.sendMessage({
    type: "duplicate-directory",
    path: `${path}`,
    newPath,
  });

  await window.api.sendMessage({
    type: "write-file",
    path: `${newPath}/.config`,
    content: { ...projectInfo, id: newId },
  });
  return true;
}
