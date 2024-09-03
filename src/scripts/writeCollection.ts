import { v4 } from "uuid";
import FolderConfig from "@/types/FolderConfig";

export default function writeCollection(arg: FolderConfig, folderPath: string) {
  const id = arg.id || v4();

  const path = `${folderPath}/${id}/.config`;

  const content: FolderConfig = { ...arg, id };
  return window.api.sendMessage({
    type: "write-file",
    content,
    path,
  });
}
