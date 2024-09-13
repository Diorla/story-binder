import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import validateDoc from "@/schema/validateDoc";
import Doc from "@/types/Doc";

export default function writeDoc(data: Doc, currentDir: string) {
  return window.api.sendMessage({
    type: "write-file",
    path: `${currentDir}/${data.id}.${APP_FILE_EXT}`,
    content: validateDoc(data),
  });
}
