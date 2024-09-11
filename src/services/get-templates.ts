import Directory from "@/types/Directory";
import Template from "@/types/Template";

export async function readTemplate(files: string[]) {
  const list: Template[] = [];
  for (const file of files) {
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `./templates/${file}`,
    })) as Template;
    list.push(info);
  }
  return list;
}

export default async function getTemplates() {
  const directory = (await window.api.sendMessage({
    type: "read-directory",
    path: "./templates",
  })) as Directory;
  const list = await readTemplate(directory.files);
  return list;
}
