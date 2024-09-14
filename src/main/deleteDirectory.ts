import { removeSync } from "fs-extra";

export default function deleteDirectory(dir: string) {
  removeSync(dir);
  return dir;
}
