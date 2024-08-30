import DocumentInfo from "./DocumentInfo";

export default interface CollectionInfo {
  id: string;
  name: string;
  note: string;
  template?: object;
  document?: {
    [key: string]: DocumentInfo;
  };
}
