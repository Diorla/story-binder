import DocumentInfo from "@/types/DocumentInfo";
import Folder from "@/types/Folder";

export default interface CollectionContextProps {
  collection: Folder;
  currentDir: string;
  collectionList: Folder[];
  reload: () => void;
  documentList: DocumentInfo[];
}
