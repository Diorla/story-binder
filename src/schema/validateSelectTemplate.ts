import SelectTemplate from "@/types/Template/SelectTemplate";
import Ajv from "ajv";
import { selectSchema } from "./selectSchema";
const ajv = new Ajv();

export default function validateSelectTemplate(value: SelectTemplate) {
  const validate = ajv.compile(selectSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: SelectTemplate = {
      type: "select",
      value: "",
    };
    return newValue;
  }
}
