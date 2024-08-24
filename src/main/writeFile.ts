import fs from "node:fs";

export default function writeFile(
  filePath: string,
  defaultContent: Buffer
): Buffer {
  fs.writeFileSync(filePath, defaultContent);
  return defaultContent;
}
