import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import Doc from "@/types/Doc";
import Directory from "@/types/Directory";
import validateDoc from "@/schema/validateDoc";

export default async function readDocList(path: string) {
  const dir = (await window.api.sendMessage({
    type: "read-directory",
    path,
  })) as Directory;
  const { files } = dir;
  const list: Doc[] = [];
  for (const file of files) {
    if (!file.endsWith(APP_FILE_EXT)) continue;
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `${path}/${file}`,
    })) as Doc;
    list.push(validateDoc(info));
  }
  return list;
}
