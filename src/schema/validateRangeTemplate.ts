import RangeTemplate from "@/types/Template/RangeTemplate";
import Ajv from "ajv";
import { rangeSchema } from "./rangeSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateRangeTemplate(value: RangeTemplate) {
  const validate = ajv.compile(rangeSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: RangeTemplate = {
      type: "range",
      value: {
        min: 0,
        max: 1,
      },
      minValue: 0,
      maxValue: 0,
      isInteger: false,
    };
    return fillObject(value, newValue);
  }
}
