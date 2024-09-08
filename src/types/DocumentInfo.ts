import Template from "./Template";
import AnswerTemplate from "./Template/AnswerTemplate";

export default interface DocumentInfo {
  id: string;
  name: string;
  note: string;
  template?: Template<AnswerTemplate>;
  content?: string;
}
