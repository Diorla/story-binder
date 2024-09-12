import SelectTemplate from "@/types/Template/SelectTemplate";
import { JSONSchemaType } from "ajv";

export const selectSchema: JSONSchemaType<SelectTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "select",
    },
    value: {
      type: "string",
    },
  },
  required: ["type", "value"],
  additionalProperties: false,
};
