import getFileExt from "@/main/getFileExt";
import fs from "node:fs";

export default function imageToDataUri(filePath: string) {
  const data = fs.readFileSync(filePath);
  const dataUri = `data:image/${getFileExt(filePath)};base64,${data.toString("base64")}`;
  return dataUri;
}
