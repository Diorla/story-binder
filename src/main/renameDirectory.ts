import fs from "node:fs";
export default function renameDirectory(oldPath: string, newPath: string) {
  fs.renameSync(oldPath, newPath);
  return newPath;
}
