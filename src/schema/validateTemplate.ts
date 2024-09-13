import Template from "@/types/Template";
import Ajv from "ajv";
const ajv = new Ajv();
import { templateSchema } from "./templateSchema";

export default function validateTemplate(value: Template) {
  const validate = ajv.compile(templateSchema);

  if (validate(value)) {
    return value;
  } else {
    return null;
  }
}
