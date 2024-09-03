import FolderConfig from "@/types/FolderConfig";

export default async function readCollectionList(
  folders: string[],
  projectPath: string
) {
  const list: FolderConfig[] = [];
  // const path = `${folderPath}/${id}/.config`;
  for (const folder of folders) {
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `${projectPath}/${folder}/.config`,
    })) as FolderConfig;
    list.push(info);
  }
  return list;
}
