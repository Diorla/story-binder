import Template from "@/types/Template";

export default async function readTemplate(files: string[]) {
  const list: Template[] = [];
  for (const file of files) {
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `./templates/${file}`,
    })) as string;
    list.push(JSON.parse(info));
  }
  return list;
}
