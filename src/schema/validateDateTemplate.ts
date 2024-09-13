import DateTemplate from "@/types/Template/DateTemplate";
import Ajv from "ajv";
import { dateSchema } from "./dateSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();
export default function validateDateTemplate(value: DateTemplate) {
  const validate = ajv.compile(dateSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: DateTemplate = {
      type: "date",
      value: 0,
      minValue: 0,
      maxValue: 1,
    };
    return fillObject(value, newValue);
  }
}
