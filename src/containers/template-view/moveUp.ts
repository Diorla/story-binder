import Template from "@/types/Template";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";

export default function moveUp(currentId: string, form: Template): Template {
  const tempForm = { ...form };
  const content: { [id: string]: TemplateFormContentType } = JSON.parse(
    tempForm.content
  );
  let prevItem = null;

  const currentItem = content[currentId];
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
