import TemplateConsumer from "./TemplateConsumer";
import TemplateProvider from "./TemplateProvider";

export default function TemplateView() {
  return (
    <TemplateProvider>
      <TemplateConsumer />
    </TemplateProvider>
  );
}
