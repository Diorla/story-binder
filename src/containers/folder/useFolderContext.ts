import { useContext } from "react";
import { FolderContext } from "./FolderContext";

export default function useFolderContext() {
  return useContext(FolderContext);
}
