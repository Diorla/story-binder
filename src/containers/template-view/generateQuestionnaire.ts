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

  if (type === "select") {
    return {
      ...base,
      answer: {
        value: "",
        type,
      },
    };
  }

  if (type === "multi-select") {
    return {
      ...base,
      answer: {
        value: [],
        type,
        minCount: 1,
        maxCount: 2,
      },
    };
  }

  if (type === "date")
    return {
      ...base,
      answer: {
        value: +new Date(),
        type,
        minValue: 0,
        maxValue: +new Date() * 2,
      },
    };
  if (type === "time")
    return {
      ...base,
      answer: {
        value: +new Date(),
        type,
        minValue: 0,
        maxValue: 1,
      },
    };
  return {
    ...base,
    answer: {
      value: "",
      type: "text",
    },
  };
}
