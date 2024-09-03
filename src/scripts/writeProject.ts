import ProjectInfo from "@/types/ProjectInfo";
import { validateProject } from "./validateProject";

export default async function writeProject(
  projectInfo: ProjectInfo,
  workspace: string
) {
  const path = `${workspace}/${projectInfo.id}`;
  await window.api.sendMessage({
    type: "create-directory",
    path,
  });
  if (validateProject(projectInfo))
    await window.api.sendMessage({
      type: "write-file",
      path: `${path}/.config`,
      content: projectInfo,
    });
  return true;
}
