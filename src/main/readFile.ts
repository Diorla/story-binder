import fs from "node:fs";
import writeFile from "./writeFile";

export default function readFile(dir: string, defaultContent?: Buffer): Buffer {
  if (fs.existsSync(dir)) {
    return fs.readFileSync(dir);
  } else if (defaultContent) {
    writeFile(dir, defaultContent);
  }
  return defaultContent;
}
