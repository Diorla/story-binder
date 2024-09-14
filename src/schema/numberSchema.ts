import NumberTemplate from "@/types/Template/NumberTemplate";
import { JSONSchemaType } from "ajv";

export const numberSchema: JSONSchemaType<NumberTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "number",
    },
    value: {
      type: "number",
    },
    minValue: {
      type: "number",
    },
    maxValue: {
      type: "number",
    },
    isInteger: {
      type: "boolean",
    },
  },
  required: ["type", "value", "minValue", "maxValue", "isInteger"],
  additionalProperties: false,
};
