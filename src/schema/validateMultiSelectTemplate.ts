import MultiSelectTemplate from "@/types/Template/MultiSelectTemplate";
import Ajv from "ajv";
import { multiSelectSchema } from "./multiSelectSchema";
const ajv = new Ajv();

export default function validateMultiSelectTemplate(
  value: MultiSelectTemplate
) {
  const validate = ajv.compile(multiSelectSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: MultiSelectTemplate = {
      type: "multi-select",
      value: [],
      minCount: 0,
      maxCount: 0,
    };
    return newValue;
  }
}
