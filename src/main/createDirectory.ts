import { ensureDirSync } from "fs-extra";

export default function createDirectory(dir: string) {
  return ensureDirSync(dir);
}
