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

      const value = { ...res, path: `${workspace}/${project}` };
      list.push(value);
    }
  } catch (error) {
    logError("Projects", "getProjectList", error);
  }
  return list;
}
