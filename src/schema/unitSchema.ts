import UnitTemplate from "@/types/Template/UnitTemplate";
import { JSONSchemaType } from "ajv";

export const unitSchema: JSONSchemaType<UnitTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "unit",
    },
    value: {
      type: "number",
    },
    unit: {
      type: "string",
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
  required: ["type", "value", "unit", "minValue", "maxValue", "isInteger"],
  additionalProperties: false,
};
