import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import Ajv from "ajv";
import { templateFormSchema } from "./templateFormSchema";
const ajv = new Ajv();

export default function validateTemplateForm(value: TemplateFormContentType) {
  const validate = ajv.compile(templateFormSchema);

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
