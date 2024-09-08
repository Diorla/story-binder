import ProjectInfo from "@/types/ProjectInfo";

export default async function writeProject(
  projectInfo: ProjectInfo,
  workspace: string
) {
  const path = `${workspace}/${projectInfo.id}`;
  await window.api.sendMessage({
    type: "create-directory",
    path,
  });
  return await window.api.sendMessage({
    type: "write-file",
    path: `${path}/.config`,
    content: projectInfo,
  });
}
