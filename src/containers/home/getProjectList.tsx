import logError from "@/scripts/logError";
import ProjectInfo from "@/types/ProjectInfo";

export default async function getProjectList(
  projects: string[],
  workspace: string
) {
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
