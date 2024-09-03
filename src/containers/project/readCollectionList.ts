import FolderConfig from "@/types/FolderConfig";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default async function readCollectionList(
  files: string[],
  projectPath: string
) {
  const list: FolderConfig[] = [];
  for (const file of files) {
    if (file !== ".config" && file.endsWith(APP_FILE_EXT)) {
      const info = (await window.api.sendMessage({
        type: "read-file",
        path: `${projectPath}/${file}`,
      })) as FolderConfig;
      list.push(info);
    }
  }
  return list;
}
