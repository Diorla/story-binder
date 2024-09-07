import AnswerTemplate from "./AnswerTemplate";
import TemplateFormContentType from "./TemplateFormContentType";

export type BaseTemplate = {
  id: string;
  name: string;
  description: string;
};

export interface FormType<T extends AnswerTemplate> extends BaseTemplate {
  type: "form";
  content: {
    [id: string]: TemplateFormContentType<T>;
  };
}

export type EditorType = BaseTemplate & {
  type: "editor";
  content: string;
};

type Template<T extends AnswerTemplate> = FormType<T> | EditorType;

export default Template;
