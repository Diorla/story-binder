import Folder from "@/types/Folder";
import validateFolder from "@/schema/validateFolder";

export default function writeFolder(arg: Folder, projectPath: string) {
  const path = `${projectPath}/.config`;

  const content: Folder = validateFolder(arg);

  return window.api.sendMessage({
    type: "write-file",
    content,
    path,
  });
}
