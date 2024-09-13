import Folder from "@/types/Folder";
import Directory from "@/types/Directory";
import validateFolder from "@/schema/validateFolder";

export default async function readFolderList(path: string) {
  const dir = (await window.api.sendMessage({
    type: "read-directory",
    path,
  })) as Directory;
  const folders = dir.folders;
  const list: Folder[] = [];
  for (const folder of folders) {
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `${path}/${folder}/.config`,
    })) as Folder;
    if (validateFolder(info)) list.push(info);
  }
  return list;
}
