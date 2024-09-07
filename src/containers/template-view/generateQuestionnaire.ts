import AnswerTemplate from "@/types/Template/AnswerTemplate";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";
import TextTemplate from "@/types/Template/TextTemplate";
import { v4 } from "uuid";

export default function generateQuestionnaire(
  type: string,
  order: number,
  page: number
): TemplateFormContentType<AnswerTemplate> {
  const base = {
    id: v4(),
    order,
    page,
    question: "",
    description: "",
    placeholder: "",
  };
  if (type === "text") {
    const answer: TextTemplate = {
      value: "",
      type,
    };
    return {
      ...base,
      answer,
    };
  }

  if (type === "number") {
    return {
      ...base,
      answer: {
        value: 0,
        type,
        minValue: 0,
        maxValue: 1,
        isInteger: true,
      },
    };
  }
  const answer: TextTemplate = {
    value: "",
    type: "text",
  };
  return {
    ...base,
    answer,
  };
}
