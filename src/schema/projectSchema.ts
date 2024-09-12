import Project from "@/types/Project";
import { JSONSchemaType } from "ajv";

export const projectSchema: JSONSchemaType<Project> = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    summary: {
      type: "string",
    },
    cover: {
      type: "string",
    },
    path: {
      type: "string",
    },
  },
  required: ["id", "name", "summary", "cover", "path"],
  additionalProperties: false,
};
