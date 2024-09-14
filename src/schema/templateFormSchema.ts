import FormQuestion from "@/types/Template/FormQuestion";
import { JSONSchemaType } from "ajv";

export const templateFormSchema: JSONSchemaType<FormQuestion> = {
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
