import TimeTemplate from "@/types/Template/TimeTemplate";
import Ajv from "ajv";
import { timeSchema } from "./timeSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateTimeTemplate(value: TimeTemplate | null) {
  const validate = ajv.compile(timeSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: TimeTemplate = {
      type: "time",
      value: "00:00",
      minValue: "00:00",
      maxValue: "23:59",
    };
    return fillObject(value, newValue);
  }
}
