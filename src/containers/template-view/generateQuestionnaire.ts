/* eslint-disable max-lines */
import validateDateTemplate from "@/schema/validateDateTemplate";
import validateMultiSelectSchema from "@/schema/validateMultiSelectTemplate";
import DateTemplate from "@/types/Template/DateTemplate";
import MultiSelectTemplate from "@/types/Template/MultiSelectTemplate";
import NumberTemplate from "@/types/Template/NumberTemplate";
import RangeTemplate from "@/types/Template/RangeTemplate";
import ReferenceTemplate from "@/types/Template/ReferenceTemplate";
import SelectTemplate from "@/types/Template/SelectTemplate";
import FormQuestion from "@/types/Template/FormQuestion";
import TextTemplate from "@/types/Template/TextTemplate";
import TimeTemplate from "@/types/Template/TimeTemplate";
import UnitTemplate from "@/types/Template/UnitTemplate";
import { v4 } from "uuid";

export default function generateQuestionnaire(
  type: string,
  order: number,
  page: number
): FormQuestion {
  const base = {
    id: v4(),
    order,
    page,
    question: "",
    description: "",
    placeholder: "",
    data: "",
  };
  if (type === "text") {
    const answer: TextTemplate = {
      value: "",
      type,
    };
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }

  if (type === "number") {
    const answer: NumberTemplate = {
      value: 0,
      type,
      minValue: 0,
      maxValue: 1,
      isInteger: true,
    };
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }

  if (type === "select") {
    const answer: SelectTemplate = {
      value: "",
      type,
    };
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }

  if (type === "multi-select") {
    const answer: MultiSelectTemplate = validateMultiSelectSchema({
      value: [],
      type,
      minCount: 1,
      maxCount: 2,
    });
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }

  if (type === "date") {
    const answer: DateTemplate = validateDateTemplate({
      value: +new Date(),
      type,
      minValue: 0,
      maxValue: +new Date() * 2,
    });
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }
  if (type === "time") {
    const answer: TimeTemplate = {
      value: +new Date(),
      type,
      minValue: 0,
      maxValue: +new Date() * 2,
    };
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }
  if (type === "range") {
    const answer: RangeTemplate = {
      value: {
        min: 0,
        max: 1,
      },
      type,
      isInteger: true,
      minValue: 0,
      maxValue: 1,
    };
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }
  if (type === "unit") {
    const answer: UnitTemplate = {
      type,
      value: 0,
      unit: "",
      minValue: 0,
      maxValue: 1,
      isInteger: true,
    };
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }
  if (type === "reference") {
    const answer: ReferenceTemplate = {
      type,
      value: "",
      templateId: "",
    };
    return {
      ...base,
      answer: JSON.stringify(answer),
    };
  }
  return {
    ...base,
    answer: "",
  };
}
