import Directory from "@/types/Directory";
import { JSONSchemaType } from "ajv";

export const directorySchema: JSONSchemaType<Directory> = {
  type: "object",
  properties: {
    files: {
      type: "array",
      items: {
        type: "string",
      },
    },
    folders: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["files", "folders"],
  additionalProperties: false,
};
