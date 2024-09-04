import DocumentInfo from "@/types/DocumentInfo";
import FolderConfig from "@/types/FolderConfig";

export default interface CollectionContextProps {
  collection: FolderConfig;
  currentDir: string;
  collectionList: FolderConfig[];
  reload: () => void;
  documentList: DocumentInfo[];
}
