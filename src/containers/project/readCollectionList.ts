import CollectionInfo from "@/types/CollectionInfo";
import APP_FILE_EXT from "@/constants/APP_FILE_EXT";

export default async function readCollectionList(
  files: string[],
  projectPath: string
) {
  const list: CollectionInfo[] = [];
  for (const file of files) {
    if (file !== ".config" && file.endsWith(APP_FILE_EXT)) {
      const info = (await window.api.sendMessage({
        type: "read-file",
        path: `${projectPath}/${file}`,
      })) as string;
      list.push(JSON.parse(info));
    }
  }
  return list;
}
