import Template from "@/types/Template";
import AnswerTemplate from "@/types/Template/AnswerTemplate";

export default interface TemplateContextProps {
  register: (value: keyof Template<AnswerTemplate>) => {
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onUpdate: (result: unknown) => void;
    onBlur: () => void;
    onFocus: () => void;
    value: unknown;
    errorText: string;
  };
  form: Template<AnswerTemplate>;
  handleSubmit: (
    callback: (data: Template<AnswerTemplate>) => void
  ) => (e: unknown) => void;
  resetForm: (value?: Partial<Template<AnswerTemplate>>) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  deleteItem: (id: string) => void;
}
