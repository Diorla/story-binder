import validateDoc from "@/schema/validateDoc";
import Doc from "@/types/Doc";

export default function writeDoc(data: Doc, filePath: string) {
  if (validateDoc(data))
    return window.api.sendMessage({
      type: "write-file",
      path: filePath,
      content: data,
    });
  throw new Error("Invalid document");
}
