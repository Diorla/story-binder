import TimeTemplate from "@/types/Template/TimeTemplate";
import { JSONSchemaType } from "ajv";

export const timeSchema: JSONSchemaType<TimeTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "time",
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
