import ProjectInfo from "@/types/ProjectInfo";
import Ajv, { JSONSchemaType } from "ajv";

export const ajv = new Ajv();

export const schema: JSONSchemaType<ProjectInfo> = {
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

export const validateProject = ajv.compile<ProjectInfo>(schema);
