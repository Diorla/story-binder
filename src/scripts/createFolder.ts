import { v4 } from "uuid";
import Folder from "@/types/Folder";
import validateFolder from "@/schema/validateFolder";

export default function createFolder(arg: Folder, projectPath: string) {
  const id = arg.id || v4();

  const path = `${projectPath}/${id}/.config`;
  const content: Folder = validateFolder({ ...arg, id });

  return window.api.sendMessage({
    type: "write-file",
    content,
    path,
  });
}
