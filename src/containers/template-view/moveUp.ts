import JSONParse from "@/scripts/JSONParse";
import Template from "@/types/Template";
import TemplateFormContentType from "@/types/Template/TemplateFormContentType";

export default function moveUp(currentId: string, form: Template): Template {
  const tempForm = { ...form };
  const content = JSONParse<{ [id: string]: TemplateFormContentType }>(
    tempForm.content
  );
  let prevItem = null;

  if (content === null) return tempForm;

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
