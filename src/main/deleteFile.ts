import fs from "node:fs";

export default function deleteFile(dir: string) {
  if (fs.existsSync(dir)) {
    fs.unlinkSync(dir);
  }
}
