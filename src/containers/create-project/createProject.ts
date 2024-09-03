import ProjectInfo from "@/types/ProjectInfo";

export default async function createProject(
  projectInfo: ProjectInfo,
  workspace: string
) {
  const path = `${workspace}/${projectInfo.name}`;
  await window.api.sendMessage({
    type: "create-directory",
    path,
  });
  await window.api.sendMessage({
    type: "write-file",
    path: `${path}/.config`,
    content: projectInfo,
  });
  return true;
}
