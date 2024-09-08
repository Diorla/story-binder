import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import DocumentInfo from "@/types/DocumentInfo";
import Directory from "@/types/Directory";

export default async function readDocumentList(path: string) {
  const dir = (await window.api.sendMessage({
    type: "read-directory",
    path,
  })) as Directory;
  const { files } = dir;
  const list: DocumentInfo[] = [];
  for (const file of files) {
    if (!file.endsWith(APP_FILE_EXT)) continue;
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `${path}/${file}`,
    })) as DocumentInfo;
    list.push(info);
  }
  return list;
}
