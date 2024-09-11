import Template from "./Template";

export default interface FolderConfig {
  id: string;
  name: string;
  note: string;
  template?: Template;
}
