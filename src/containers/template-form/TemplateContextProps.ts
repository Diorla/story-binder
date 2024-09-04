import Template from "@/types/Template";

export default interface TemplateContextProps {
  register: (value: keyof Template) => {
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onUpdate: (result: unknown) => void;
    onBlur: () => void;
    onFocus: () => void;
    value: unknown;
    errorText: string;
  };
  form: Template;
  handleSubmit: (callback: (data: Template) => void) => (e: unknown) => void;
  resetForm: (value?: Partial<Template>) => void;
}
