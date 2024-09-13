import ReferenceTemplate from "@/types/Template/ReferenceTemplate";
import Ajv from "ajv";
import { referenceSchema } from "./referenceSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateReferenceTemplate(value: ReferenceTemplate) {
  const validate = ajv.compile(referenceSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: ReferenceTemplate = {
      type: "reference",
      templateId: "",
      value: "",
    };
    return fillObject(value, newValue);
  }
}
