import FolderConfig from "@/types/FolderConfig";
import validateCollection from "./validateCollection";
import Directory from "@/types/Directory";
import logError from "./logError";

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
      logError(
        "read collection list",
        "ajv validation",
        new Error(JSON.stringify(validateCollection.errors))
      );
    }
  }
  return list;
}
