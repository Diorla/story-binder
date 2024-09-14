import Doc from "@/types/Doc";
import Folder from "@/types/Folder";

export default interface FolderContextProps {
  folder: Folder;
  currentDir: string;
  folderList: Folder[];
  reload: () => void;
  docList: Doc[];
}
