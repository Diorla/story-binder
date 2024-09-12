import User from "@/types/User";
import { JSONSchemaType } from "ajv";

export const userSchema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    onboardingCompletedAt: {
      type: "number",
    },
    appInitialisedAt: {
      type: "number",
    },
    workspace: {
      type: "string",
    },
    explored: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: [
    "onboardingCompletedAt",
    "appInitialisedAt",
    "workspace",
    "explored",
  ],
  additionalProperties: false,
};
