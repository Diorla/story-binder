import Template from "./Template";

export default interface DocumentInfo {
  id: string;
  name: string;
  note: string;
  template?: Template;
  content?: string;
}
