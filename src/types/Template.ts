import FormTemplate from "./FormTemplate";

type BaseTemplate = {
  id: string;
  description: string;
  type: "form" | "editor";
};

export interface FormType extends BaseTemplate {
  id: string;
  description: string;
  type: "form";
  template: FormTemplate;
}

export interface EditorType extends BaseTemplate {
  id: string;
  type: "editor";
  description: string;
  template: string;
}

type Template = FormType | EditorType;

export default Template;
