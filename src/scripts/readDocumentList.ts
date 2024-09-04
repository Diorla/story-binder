import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import DocumentInfo from "@/types/DocumentInfo";
import logError from "./logError";
import validateDocument from "./validateDocument";
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
    if (validateDocument(info)) list.push(info);
    else {
      logError(
        "read collection list",
        "ajv validation",
        new Error(JSON.stringify(validateDocument.errors))
      );
    }
  }
  return list;
}
