import { v4 } from "uuid";
import Folder from "@/types/Folder";

export default function writeCollection(arg: Folder, projectPath: string) {
  const id = arg.id || v4();

  const path = `${projectPath}/${id}/.config`;
  const content: Folder = { ...arg, id };

  return window.api.sendMessage({
    type: "write-file",
    content,
    path,
  });
}
