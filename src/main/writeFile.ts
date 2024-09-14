import { WriteFile } from "@/types/Payload";
import { outputJSONSync } from "fs-extra";

export default function writeFile(payload: WriteFile) {
  outputJSONSync(payload.path, payload.content);
  return payload.content;
}
