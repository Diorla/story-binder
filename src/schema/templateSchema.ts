import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import { JSONSchemaType } from "ajv";

export const templateSchema: JSONSchemaType<TemplateFormContentType> = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    order: {
      type: "number",
    },
    page: {
      type: "number",
    },
    description: {
      type: "string",
    },
    question: {
      type: "string",
    },
    data: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    answer: {
      type: "string",
    },
  },
  required: [
    "id",
    "order",
    "page",
    "description",
    "question",
    "answer",
    "data",
    "placeholder",
  ],
  additionalProperties: true,
};
