import Template from "@/types/Template";
import AnswerTemplate from "@/types/Template/AnswerTemplate";

export default async function readTemplate(files: string[]) {
  const list: Template<AnswerTemplate>[] = [];
  for (const file of files) {
    const info = (await window.api.sendMessage({
      type: "read-file",
      path: `./templates/${file}`,
    })) as Template<AnswerTemplate>;
    list.push(info);
  }
  return list;
}
