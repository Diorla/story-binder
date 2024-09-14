import validateFormContent from "@/schema/validateFormContent";
import JSONParse from "@/scripts/JSONParse";
import Template from "@/types/Template";
import FormContent from "@/types/Template/FormContent";

export default function moveUp(currentId: string, form: Template): Template {
  const tempForm = { ...form };
  const content = validateFormContent(JSONParse<FormContent>(tempForm.content));

  let prevIdx = -Infinity;

  let prevId = currentId;
  const currentIdx = content[currentId].order;

  Object.keys(content)
    .filter((key) => key !== currentId)
    .forEach((key) => {
      const item = content[key];
      if (item.order >= prevIdx && item.order <= currentIdx) {
        prevIdx = item.order;
        prevId = key;
      }
    });

  content[prevId].order = currentIdx;
  content[currentId].order = prevIdx;
  tempForm.content = JSON.stringify(content);
  return tempForm;
}
