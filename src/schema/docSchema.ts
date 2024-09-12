import Doc from "@/types/Doc";
import { JSONSchemaType } from "ajv";

export const docSchema: JSONSchemaType<Doc> = {
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
    content: {
      type: "string",
    },
  },
  required: ["id", "name", "note"],
  additionalProperties: false,
};
