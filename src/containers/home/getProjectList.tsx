import logError from "@/scripts/logError";
import Directory from "@/types/Directory";
import ProjectInfo from "@/types/ProjectInfo";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

const schema: JSONSchemaType<ProjectInfo> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    summary: { type: "string" },
    cover: { type: "string" },
    path: { type: "string" },
  },
  required: ["id", "name", "summary", "cover", "path"],
};

const validate = ajv.compile<ProjectInfo>(schema);

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
      if (validate(value)) list.push(value);
    }
  } catch (error) {
    logError("Projects", "getProjectList", error);
  }
  return list;
}
