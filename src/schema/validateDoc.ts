import Ajv from "ajv";
import { docSchema } from "./docSchema";
import Doc from "@/types/Doc";
const ajv = new Ajv();

export default function validateDoc(value: Doc) {
  const validate = ajv.compile(docSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Doc = {
      id: "",
      name: "",
      note: "",
      template: "",
      content: "",
    };
    return newValue;
  }
}
