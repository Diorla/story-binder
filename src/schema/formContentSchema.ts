export const formContentSchema = {
  definitions: {
    FormQuestion: {
      type: "object",
      patternProperties: {
        "^[a-zA-Z0-9_-]+$": {
          type: "object",
          properties: {
            id: { type: "string", description: "The id of the question" },
            order: {
              type: "number",
              description: "Used to sort the questions",
            },
            page: { type: "number", description: "Used for pagination" },
            description: {
              type: "string",
              description: "More information about the question",
            },
            question: {
              type: "string",
              description: "The worded question, that would end with '?'",
            },
            data: {
              type: "string",
              description:
                "The data entered by the user, can be used to pre-populate the input field",
            },
            placeholder: {
              type: "string",
              description: "Placeholder for the input field",
            },
            answer: {
              type: "string",
              description:
                "The type of the input field, such as text, number, email, etc.",
            },
          },
          required: [
            "id",
            "order",
            "page",
            "description",
            "question",
            "data",
            "placeholder",
            "answer",
          ],
          additionalProperties: false,
        },
      },
    },
    FormTemplateContent: {
      type: "object",
      patternProperties: {
        "^[a-zA-Z0-9_-]+$": {
          $ref: "#/definitions/FormQuestion",
        },
      },
      additionalProperties: false,
    },
  },
};
