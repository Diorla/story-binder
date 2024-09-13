import validateProject from "@/schema/validateProject";
import logError from "@/scripts/logError";
import Directory from "@/types/Directory";
import Project from "@/types/Project";

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
      })) as Project;

      const value = { ...res, path: `${workspace}/${project}` };
      list.push(validateProject(value));
    }
  } catch (error) {
    logError("Projects", "getProjectList", error as Error);
  }
  return list;
}
