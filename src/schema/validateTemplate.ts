import Template from "@/types/Template";
import Ajv from "ajv";
const ajv = new Ajv();
import { templateSchema } from "./templateSchema";
import fillObject from "@/scripts/fillObject";

export default function validateTemplate(value: Template) {
  const validate = ajv.compile(templateSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Template = {
      id: "",
      name: "",
      description: "",
      type: "form",
      content: "",
    };
    return fillObject(value, newValue);
  }
}
