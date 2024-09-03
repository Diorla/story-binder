import FolderConfig from "@/types/FolderConfig";
import validateCollection from "./validateCollection";
import Directory from "@/types/Directory";

export default async function readCollectionList(path: string) {
  const dir = (await window.api.sendMessage({
    type: "read-directory",
    path,
  })) as Directory;
  const folders = dir.folders;
  const list: FolderConfig[] = [];
  for (const folder of folders) {
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `${path}/${folder}/.config`,
    })) as FolderConfig;

    if (validateCollection(info)) list.push(info);
    else {
      console.log("data", info);
      console.log("ajv validation error:", validateCollection.errors);
    }
  }
  return list;
}
