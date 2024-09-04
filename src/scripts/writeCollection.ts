import { v4 } from "uuid";
import FolderConfig from "@/types/FolderConfig";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import validateCollection from "@/scripts/validateCollection";

export default function writeCollection(
  arg: FolderConfig,
  projectPath: string
) {
  const id = arg.id || v4();

  const path = `${projectPath}/${id}.${APP_FILE_EXT}`;
  const content: FolderConfig = { ...arg, id };

  if (validateCollection(content))
    return window.api.sendMessage({
      type: "write-file",
      content,
      path,
    });
  else {
    throw new Error(JSON.stringify(validateCollection.errors));
  }
}
