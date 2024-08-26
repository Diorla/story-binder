import path from "node:path";

export default function getFileExt(file: string) {
  return path.extname(file);
}
