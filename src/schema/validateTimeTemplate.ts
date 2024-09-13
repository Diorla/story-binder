import TimeTemplate from "@/types/Template/TimeTemplate";
import Ajv from "ajv";
import { timeSchema } from "./timeSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateTimeTemplate(value: TimeTemplate) {
  const validate = ajv.compile(timeSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: TimeTemplate = {
      type: "time",
      value: 0,
      minValue: 0,
      maxValue: 0,
    };
    return fillObject(value, newValue);
  }
}
