import { WriteFile } from "@/types/Payload";
import fs from "node:fs";

export default function writeFile(payload: WriteFile) {
  fs.writeFileSync(payload.path, payload.content, { encoding: "utf-8" });
  return payload.content;
}
