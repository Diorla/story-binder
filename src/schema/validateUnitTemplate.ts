import UnitTemplate from "@/types/Template/UnitTemplate";
import Ajv from "ajv";
import { unitSchema } from "./unitSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateUnitTemplate(value: UnitTemplate | null) {
  const validate = ajv.compile(unitSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: UnitTemplate = {
      type: "unit",
      value: 0,
      unit: "",
      minValue: 0,
      maxValue: 0,
      isInteger: false,
    };
    return fillObject(value, newValue);
  }
}
