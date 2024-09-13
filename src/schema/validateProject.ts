import Project from "@/types/Project";
import Ajv from "ajv";
import { projectSchema } from "./projectSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateProject(value: Project | null) {
  const validate = ajv.compile(projectSchema);

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
    return fillObject(value, newValue);
  }
}
