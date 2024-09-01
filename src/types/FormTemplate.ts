export type TextTemplate = {
  type: "text";
  value: string;
  data: string;
};

export type NumberTemplate = {
  type: "number";
  value: number;
  minValue: number;
  maxValue: number;
  isInteger: boolean;
};

export type UnitTemplate = {
  type: "unit";
  value: number;
  unit: string;
  data: string;
  minValue: number;
  maxValue: number;
  isInteger: boolean;
};

export type SelectTemplate = {
  type: "select";
  value: string;
  data: string;
};

export type MultiSelectTemplate = {
  type: "multi-select";
  value: string[];
  data: string;
  minCount: number;
  maxCount: number;
};

export type RangeTemplate = {
  type: "range";
  value: [number, number];
  minValue: number;
  maxValue: number;
  isInteger: boolean;
};

// This only support gregorian format
export type DateTemplate = {
  type: "date";
  value: number;
  minValue: number;
  maxValue: number;
};

// This only support 24 hour format
export type TimeTemplate = {
  type: "time";
  // hour, minute, seconds
  value: number;
  minValue: number; //
  maxValue: number; //
};

export type ReferenceTemplate = {
  type: "reference";
  // Points to a template in your library
  templateId: string;
  value: string;
};

export type AnswerType =
  | TextTemplate
  | NumberTemplate
  | SelectTemplate
  | MultiSelectTemplate
  | DateTemplate
  | TimeTemplate
  | RangeTemplate
  | ReferenceTemplate
  | UnitTemplate;

export interface Question {
  id: string;
  order: number;
  question: string;
  description: string;
  placeholder: string;
  answer: AnswerType;
}

export default interface FormTemplate {
  id: string;
  title: string;
  description: string;
  /**
   * The part of the question that would be used on the item as title
   * It should be a String or Number type
   */
  titleId: string;
  /**
   * The part of the question that would be used on the item as description
   * It should be a String or Number type
   */
  descriptionId: string;
  /**
   * user id
   */
  userId: string;
  questions: Question[];
  createdAt: number;
  updatedAt: number;
}
