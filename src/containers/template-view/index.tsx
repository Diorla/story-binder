import TemplateConsumer from "./TemplateConsumer";
import TemplateProvider from "./TemplateProvider";

export default function TemplateForm() {
  return (
    <TemplateProvider>
      <TemplateConsumer />
    </TemplateProvider>
  );
}
