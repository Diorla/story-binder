import logError from "@/scripts/logError";

export default async function getProjectList(
  projects: string[],
  workspace: string
) {
  const list = [];
  try {
    for (const project of projects) {
      const path = `${workspace}/${project}/.config`;
      const res = await window.api.sendMessage({
        type: "read-file",
        path,
      });

      const obj = JSON.parse(res as string);
      list.push({ ...obj, path: `${workspace}/${project}` });
    }
  } catch (error) {
    logError("Projects", "getProjectList", error);
  }
  return list;
}
