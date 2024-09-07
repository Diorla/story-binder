import AnswerTemplate from "./AnswerTemplate";

export default interface TemplateFormContentType<T extends AnswerTemplate> {
  /**
   * The id of the question
   */
  id: string;
  /**
   * Used to sort the questions
   */
  order: number;
  /**
   * Used for pagination
   */
  page: number;
  /**
   * More information about the question
   */
  description: string;
  /**
   * The worded question, that would end with "?"
   */
  question: string;
  /**
   * The data entered by the user, can be used to pre-populate the input field
   * or generate a value
   */
  data?: string;
  /**
   * Placeholder for the input field, can be used to provide example
   */
  placeholder?: string;
  answer: T;
}
