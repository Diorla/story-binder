import RangeTemplate from "@/types/Template/RangeTemplate";
import { JSONSchemaType } from "ajv";

export const rangeSchema: JSONSchemaType<RangeTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "range",
    },
    value: {
      type: "object",
      properties: {
        min: {
          type: "number",
        },
        max: {
          type: "number",
        },
      },
      required: ["min", "max"],
      additionalProperties: false,
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
