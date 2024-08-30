import fs from "node:fs";

export default function deleteDirectory(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true });
  }
  return dir;
}
