import { ReadFile } from "@/types/Payload";
import { ensureFileSync, readJSONSync } from "fs-extra";

// TODO: Encrypt read write with safeStorage
export default function readFile(payload: ReadFile) {
  ensureFileSync(payload.path);
  return (
    readJSONSync(payload.path, { encoding: "utf-8", throws: false }) ||
    payload.defaultContent
  );
}
