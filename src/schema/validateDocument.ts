import Document from "@/types/Document";
import Ajv from "ajv";
import { documentSchema } from "./documentSchema";
const ajv = new Ajv();

export default function validateDocument(value: Document) {
  const validate = ajv.compile(documentSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: Document = {
      id: "",
      name: "",
      note: "",
      template: "",
      content: "",
    };
    return newValue;
  }
}
