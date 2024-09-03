import { removeSync } from "fs-extra";

export default function deleteFile(dir: string) {
  removeSync(dir);
  return dir;
}
