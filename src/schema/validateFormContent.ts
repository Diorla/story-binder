import FormContent from "@/types/Template/FormContent";
import Ajv from "ajv";
const ajv = new Ajv();
import fillObject from "@/scripts/fillObject";
import { formContentSchema } from "./formContentSchema";

export default function validateFormContent(
  value: FormContent | null
): FormContent {
  if (value === null) return {};
  const validate = ajv.compile(formContentSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: FormContent = {};
    return fillObject(value, newValue);
  }
}
