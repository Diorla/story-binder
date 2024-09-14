import Template from "@/types/Template";
import { JSONSchemaType } from "ajv";

export const templateSchema: JSONSchemaType<Template> = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    content: {
      type: "string",
    },
  },
  required: ["id", "name", "description", "content"],
  additionalProperties: false,
};
