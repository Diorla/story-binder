import User from "@/types/User";
import Ajv from "ajv";
import { userSchema } from "./userSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateUser(value: User | null) {
  const validate = ajv.compile(userSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: User = {
      onboardingCompletedAt: 0,
      appInitialisedAt: 0,
      workspace: "",
      explored: [],
      projectPath: "",
      templatePath: "",
    };
    return fillObject(value, newValue);
  }
}
