import TextTemplate from "@/types/Template/TextTemplate";
import { JSONSchemaType } from "ajv";

export const textSchema: JSONSchemaType<TextTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "text",
    },
    value: {
      type: "string",
    },
  },
  required: ["type", "value"],
  additionalProperties: false,
};
