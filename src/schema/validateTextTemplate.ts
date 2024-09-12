import TextTemplate from "@/types/Template/TextTemplate";
import Ajv from "ajv";
import { textSchema } from "./textSchema";
const ajv = new Ajv();

export default function validateTextSchema(value: TextTemplate) {
  const validate = ajv.compile(textSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: TextTemplate = {
      type: "text",
      value: "",
    };
    return newValue;
  }
}
