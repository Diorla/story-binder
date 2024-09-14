import Filter from "@/types/Filter";
import { JSONSchemaType } from "ajv";

export const filterSchema: JSONSchemaType<Filter> = {
  type: "object",
  properties: {
    images: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        extensions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["name", "extensions"],
      additionalProperties: false,
    },
    pdf: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        extensions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["name", "extensions"],
      additionalProperties: false,
    },
    all: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        extensions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["name", "extensions"],
      additionalProperties: false,
    },
    db: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        extensions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["name", "extensions"],
      additionalProperties: false,
    },
    app: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        extensions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["name", "extensions"],
      additionalProperties: false,
    },
  },
  required: ["images", "pdf", "all", "db", "app"],
  additionalProperties: false,
};
