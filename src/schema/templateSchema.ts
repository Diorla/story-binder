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
    type: {
      type: "string",
      enum: ["form", "editor"],
    },
    content: {
      type: "string",
    },
  },
  required: ["id", "name", "description", "type", "content"],
  additionalProperties: false,
};
