import MultiSelectTemplate from "@/types/Template/MultiSelectTemplate";
import { JSONSchemaType } from "ajv";

export const multiSelectSchema: JSONSchemaType<MultiSelectTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "multi-select",
    },
    value: {
      type: "array",
      items: {
        type: "string",
      },
    },
    minCount: {
      type: "number",
    },
    maxCount: {
      type: "number",
    },
  },
  required: ["type", "value", "minCount", "maxCount"],
  additionalProperties: false,
};
