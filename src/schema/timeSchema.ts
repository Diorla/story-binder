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
      type: "string",
    },
    minValue: {
      type: "string",
    },
    maxValue: {
      type: "string",
    },
  },
  required: ["type", "value", "minValue", "maxValue"],
  additionalProperties: false,
};
