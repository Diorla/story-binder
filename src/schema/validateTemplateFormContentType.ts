import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import Ajv from "ajv";
import { templateSchema } from "./templateSchema";
const ajv = new Ajv();

export default function validateNumberTemplate(value: TemplateFormContentType) {
  const validate = ajv.compile(templateSchema);

  if (validate(value)) {
    return value;
  } else {
    const newValue: TemplateFormContentType = {
      id: "",
      order: 0,
      page: 0,
      description: "",
      question: "",
      answer: "",
      data: "",
      placeholder: "",
    };
    return newValue;
  }
}
