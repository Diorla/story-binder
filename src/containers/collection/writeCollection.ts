import { v4 } from "uuid";
import CollectionInfo from "@/types/CollectionInfo";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default function writeCollection(
  arg: CollectionInfo,
  projectPath: string
) {
  const id = arg.id || v4();

  const path = `${projectPath}/${id}.${APP_FILE_EXT}`;
  const content: CollectionInfo = { ...arg, id };
  return window.api.sendMessage({
    type: "write-file",
    content: JSON.stringify(content),
    path,
  });
}
