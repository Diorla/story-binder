import { v4 } from "uuid";
import FolderConfig from "@/types/FolderConfig";

export default function writeCollection(
  arg: FolderConfig,
  projectPath: string
) {
  const id = arg.id || v4();

  const path = `${projectPath}/${id}/.config`;
  const content: FolderConfig = { ...arg, id };

  return window.api.sendMessage({
    type: "write-file",
    content,
    path,
  });
}
