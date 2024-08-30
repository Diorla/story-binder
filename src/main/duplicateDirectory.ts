import fs from "node:fs";
import path from "node:path";

export default function duplicateDirectory(src: string, des?: string) {
  let destination = des ?? src;
  while (fs.existsSync(destination)) {
    destination += "-copy";
  }
  fs.mkdirSync(destination, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      duplicateDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const symlink = fs.readlinkSync(srcPath);
      fs.symlinkSync(symlink, destPath);
    }
  }
  return destination;
}
