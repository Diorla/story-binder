import Template from "./Template";
import AnswerTemplate from "./Template/AnswerTemplate";

export default interface FolderConfig {
  id: string;
  name: string;
  note: string;
  template?: Template<AnswerTemplate>;
}
