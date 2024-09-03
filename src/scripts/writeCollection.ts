import { v4 } from "uuid";
import FolderConfig from "@/types/FolderConfig";
import validateCollection from "./validateCollection";

export default function writeCollection(arg: FolderConfig, folderPath: string) {
  const id = arg.id || v4();

  const path = `${folderPath}/${id}/.config`;

  const content: FolderConfig = { ...arg, id };
  if (validateCollection(content))
    return window.api.sendMessage({
      type: "write-file",
      content,
      path,
    });
  else throw new Error("Invalid collection");
}
