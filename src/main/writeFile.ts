import fs from "node:fs";

export default function writeFile(dir: string, defaultContent: Buffer): Buffer {
  fs.writeFileSync(dir, defaultContent);
  return defaultContent;
}
