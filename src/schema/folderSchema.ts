import Folder from "@/types/Folder";
import { JSONSchemaType } from "ajv";

export const folderSchema: JSONSchemaType<Folder> = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    note: {
      type: "string",
    },
    template: {
      type: "string",
    },
  },
  required: ["id", "name", "note", "template"],
  additionalProperties: false,
};
