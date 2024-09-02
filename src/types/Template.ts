import FormTemplate from "./FormTemplate";

type BaseTemplate = {
  id: string;
  description: string;
  type: "form" | "editor";
  name: string;
};

export interface FormType extends BaseTemplate {
  type: "form";
  template: FormTemplate;
}

export interface EditorType extends BaseTemplate {
  type: "editor";
  template: string;
}

type Template = FormType | EditorType;

export default Template;
