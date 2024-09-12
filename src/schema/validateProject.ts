import Project from "@/types/Project";
import Ajv from "ajv";
import { directorySchema } from "./directorySchema";
const ajv = new Ajv();

export default function validateProject(value: Project) {
  const validate = ajv.compile(directorySchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Project = {
      id: "",
      name: "",
      summary: "",
      cover: "",
      path: "",
    };
    return newValue;
  }
}
