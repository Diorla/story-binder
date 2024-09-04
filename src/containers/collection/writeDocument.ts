import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import logError from "@/scripts/logError";
import validateDocument from "@/scripts/validateDocument";
import DocumentInfo from "@/types/DocumentInfo";

export default function writeDocument(data: DocumentInfo, currentDir: string) {
  if (validateDocument(data))
    return window.api.sendMessage({
      type: "write-file",
      path: `${currentDir}/${data.id}.${APP_FILE_EXT}`,
      content: data,
    });
  else {
    logError(
      "write collection",
      "invalid collection",
      new Error(JSON.stringify(validateDocument.errors))
    );
  }
}
