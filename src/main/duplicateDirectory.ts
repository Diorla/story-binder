import { copySync } from "fs-extra";
import fs from "node:fs";

export default function duplicateDirectory(src: string, des?: string) {
  let destination = des ?? src;
  while (fs.existsSync(destination)) {
    destination += "-copy";
  }
  copySync(src, destination);
  return destination;
}
