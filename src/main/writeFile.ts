import { WriteFile } from "@/types/Payload";
import fs from "node:fs";

export default function writeFile(payload: WriteFile) {
  const dir = payload.path.split("/").slice(0, -1).join("/");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(payload.path, payload.content, { encoding: "utf-8" });
  return payload.content;
}
