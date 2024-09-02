import APP_FILE_EXT from "@/constants/APP_FILE_EXT";
import Template from "@/types/Template";

export default async function readTemplate(files: string[]) {
  const list: Template[] = [];
  for (const file of files) {
    if (file !== ".config" && file.endsWith(APP_FILE_EXT)) {
      const info = (await window.api.sendMessage({
        type: "read-file",
        path: `./templates/${file}`,
      })) as string;
      list.push(JSON.parse(info));
    }
  }
  return list;
}
