import DateTemplate from "@/types/Template/DateTemplate";
import { JSONSchemaType } from "ajv";

export const dateSchema: JSONSchemaType<DateTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "date",
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
  },
  required: ["type", "value", "minValue", "maxValue"],
  additionalProperties: false,
};
