import { v4 } from "uuid";
import Folder from "@/types/Folder";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function writeCollection(arg: Folder, projectPath: string) {
  const id = arg.id || v4();

  const path = `${projectPath}/${id}.${APP_FILE_EXT}`;
  const content: Folder = { ...arg, id };
  return window.api.sendMessage({
    type: "write-file",
    content,
    path,
  });
}
