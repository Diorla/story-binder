import Template from "@/types/Template";

type TemplateKeys = keyof Template;

export default interface TemplateContextProps {
  register: (value: TemplateKeys) => {
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onUpdate: <K extends TemplateKeys>(result: Template[K]) => void;
    onBlur: () => void;
    onFocus: () => void;
    value: unknown;
    errorText: string;
  };
  form: Template;
  handleSubmit: (callback: (data: Template) => void) => (e: unknown) => void;
  resetForm: (value?: Partial<Template>) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  deleteItem: (id: string) => void;
}
