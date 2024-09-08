import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import DocumentInfo from "@/types/DocumentInfo";

// TODO: Implement JSON schema and validation
/**
 * So there should be a /schema folder where every single interface and type
 * will correspond to a json schema. Then we can validate the data before writing
 * it to the disk.
 */
export default function writeDocument(data: DocumentInfo, currentDir: string) {
  return window.api.sendMessage({
    type: "write-file",
    path: `${currentDir}/${data.id}.${APP_FILE_EXT}`,
    content: data,
  });
}
