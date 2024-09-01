import FormTemplate from "./FormTemplate";

export type FormType = {
  id: string;
  description: string;
  type: "form";
  template: FormTemplate;
};

export type EditorType = {
  id: string;
  type: "editor";
  description: string;
  template: string;
};

type Template = FormType | EditorType;

export default Template;
