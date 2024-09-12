import { createContext } from "react";
import FolderContextProps from "./FolderContextProps";
import { defaultFolder } from "./defaultFolder";

export const FolderContext = createContext<FolderContextProps>({
  folder: defaultFolder,
  currentDir: "",
  folderList: [],
  reload: () => "",
  docList: [],
});
