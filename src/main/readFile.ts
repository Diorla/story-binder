import fs from "node:fs";
import writeFile from "./writeFile";
import { ReadFile } from "@/types/Payload";

// TODO: Encrypt read write with safeStorage
export default function readFile(payload: ReadFile) {
  if (fs.existsSync(payload.path)) {
    return fs.readFileSync(payload.path, { encoding: "utf-8" });
  }
  if (payload.defaultContent) {
    writeFile({
      ...payload,
      content: payload.defaultContent,
      type: "write-file",
    });
  }
  return payload.defaultContent;
}
