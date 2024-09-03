import logError from "@/scripts/logError";
import Directory from "@/types/Directory";
import ProjectInfo from "@/types/ProjectInfo";

export default async function getProjectList(workspace: string) {
  const dirNames = (await window.api?.sendMessage({
    type: "read-directory",
    path: workspace,
  })) as Directory;

  const projects = dirNames.folders;
  const list = [];
  try {
    for (const project of projects) {
      const path = `${workspace}/${project}/.config`;
      const res = (await window.api.sendMessage({
        type: "read-file",
        path,
      })) as ProjectInfo;

      list.push({ ...res, path: `${workspace}/${project}` });
    }
  } catch (error) {
    logError("Projects", "getProjectList", error);
  }
  return list;
}
