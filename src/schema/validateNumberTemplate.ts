import NumberTemplate from "@/types/Template/NumberTemplate";
import Ajv from "ajv";
import { numberSchema } from "./numberSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateNumberTemplate(value: NumberTemplate | null) {
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
    return fillObject(value, newValue);
  }
}
