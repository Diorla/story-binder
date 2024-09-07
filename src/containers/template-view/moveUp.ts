import Template from "@/types/Template";
import AnswerTemplate from "@/types/Template/AnswerTemplate";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";

export default function moveUp(
  currentId: string,
  form: Template<AnswerTemplate>
): Template<AnswerTemplate> {
  const tempForm = { ...form };
  const { content } = tempForm;
  let prevItem = null;
  if (typeof content === "string" || !content[currentId]) return tempForm;

  const currentItem = content[
    currentId
  ] as TemplateFormContentType<AnswerTemplate>;
  const currentIdx = currentItem.order;

  let prevIdx = -Infinity;

  for (const key of Object.keys(content)) {
    if (content[key].id === currentId) continue;
    if (content[key].order >= prevIdx && content[key].order <= currentIdx) {
      prevIdx = content[key].order;
      prevItem = { ...content[key] };
    }
  }

  if (!prevItem) return tempForm;
  prevItem.order = currentIdx;
  currentItem.order = prevIdx;

  content[prevItem.id] = prevItem;
  content[currentId] = currentItem;
  return tempForm;
}
