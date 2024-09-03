import { v4 } from "uuid";
import FolderConfig from "@/types/FolderConfig";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function writeCollection(
  arg: FolderConfig,
  projectPath: string
) {
  const id = arg.id || v4();

  const path = `${projectPath}/${id}.${APP_FILE_EXT}`;
  const content: FolderConfig = { ...arg, id };
  return window.api.sendMessage({
    type: "write-file",
    content: JSON.stringify(content),
    path,
  });
}
