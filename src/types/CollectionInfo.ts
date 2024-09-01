import DocumentInfo from "./DocumentInfo";
import Template from "./Template";

export default interface CollectionInfo {
  id: string;
  name: string;
  note: string;
  template?: Template;
  document?: {
    [key: string]: DocumentInfo;
  };
}
