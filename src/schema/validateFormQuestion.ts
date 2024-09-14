import FormQuestion from "@/types/Template/FormQuestion";
import Ajv from "ajv";
import { templateFormSchema } from "./templateFormSchema";
import fillObject from "@/scripts/fillObject";
const ajv = new Ajv();

export default function validateFormQuestion(value: FormQuestion | null) {
  const newValue: FormQuestion = {
    id: "",
    order: 0,
    page: 0,
    description: "",
    question: "",
    answer: "",
    data: "",
    placeholder: "",
  };
  if (value === null) return newValue;
  const validate = ajv.compile(templateFormSchema);

  if (validate(value)) {
    return value;
  } else {
    return fillObject(value, newValue);
  }
}
