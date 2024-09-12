import ReferenceTemplate from "@/types/Template/ReferenceTemplate";
import { JSONSchemaType } from "ajv";

export const referenceSchema: JSONSchemaType<ReferenceTemplate> = {
  type: "object",
  properties: {
    type: {
      type: "string",
      const: "reference",
    },
    templateId: {
      type: "string",
    },
    value: {
      type: "string",
    },
  },
  required: ["type", "templateId", "value"],
  additionalProperties: false,
};
