import ReferenceTemplate from "@/types/Template/ReferenceTemplate";
import Ajv from "ajv";
import { referenceSchema } from "./referenceSchema";
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
    return newValue;
  }
}
