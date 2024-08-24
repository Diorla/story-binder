import fs from "node:fs";
import path from "node:path";

export default function readDirectory(dir: string) {
  const content = fs.readdirSync(dir);
  const files = content.filter((item) =>
    fs.statSync(path.join(dir, item)).isFile()
  );
  const folders = content.filter((item) =>
    fs.statSync(path.join(dir, item)).isDirectory()
  );
  return { files, folders };
}
