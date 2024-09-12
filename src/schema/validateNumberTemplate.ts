import NumberTemplate from "@/types/Template/NumberTemplate";
import Ajv from "ajv";
import { numberSchema } from "./numberSchema";
const ajv = new Ajv();

export default function validateNumberTemplate(value: NumberTemplate) {
  const validate = ajv.compile(numberSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: NumberTemplate = {
      type: "number",
      value: 0,
      minValue: 0,
      maxValue: 0,
      isInteger: false,
    };
    return newValue;
  }
}
