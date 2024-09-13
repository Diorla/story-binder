import validateTemplate from "@/schema/validateTemplate";
import Directory from "@/types/Directory";
import Template from "@/types/Template";

export async function readTemplate(files: string[], templatePath: string) {
  const list: Template[] = [];
  for (const file of files) {
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `${templatePath}/${file}`,
    })) as Template;
    if (validateTemplate(info)) list.push(info);
  }
  return list;
}

export default async function getTemplates(templatePath: string) {
  const directory = (await window.api.sendMessage({
    type: "read-directory",
    path: templatePath,
  })) as Directory;
  const list = await readTemplate(directory.files, templatePath);
  return list;
}
