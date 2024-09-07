import AnswerTemplate from "./AnswerTemplate";
import TemplateFormContentType from "./TemplateFormContentType";

type BaseTemplate = {
  id: string;
  name: string;
  description: string;
};

// type FormType = BaseTemplate & {
//   type: "form";
//   content: {
//     [id: string]: TemplateFormContentType;
//   };
// };
interface FormType<T extends AnswerTemplate> extends BaseTemplate {
  type: "form";
  content: {
    [id: string]: TemplateFormContentType<T>;
  };
}

type EditorType = BaseTemplate & {
  type: "editor";
  content: string;
};

type Template<T extends AnswerTemplate> = FormType<T> | EditorType;

export default Template;
