import validateProject from "@/schema/validateProject";
import logError from "@/scripts/logError";
import Directory from "@/types/Directory";
import Project from "@/types/Project";

export default async function getProjectList(projectPath: string) {
  const dirNames = (await window.api?.sendMessage({
    type: "read-directory",
    path: projectPath,
  })) as Directory;

  const projects = dirNames.folders;
  const list = [];
  try {
    for (const project of projects) {
      const path = `${projectPath}/${project}/.config`;
      const res = (await window.api.sendMessage({
        type: "read-file",
        path,
      })) as Project;

      const value = { ...res, path: `${projectPath}/${project}` };
      list.push(validateProject(value));
    }
  } catch (error) {
    logError("Projects", "getProjectList", error as Error);
  }
  return list;
}
