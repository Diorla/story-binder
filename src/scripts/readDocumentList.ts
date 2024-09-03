import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import DocumentInfo from "@/types/DocumentInfo";

export default async function readDocumentList(
  files: string[],
  projectPath: string
) {
  const list: DocumentInfo[] = [];
  for (const file of files) {
    if (!file.endsWith(APP_FILE_EXT)) continue;
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `${projectPath}/${file}`,
    })) as DocumentInfo;
    list.push(info);
  }
  return list;
}
