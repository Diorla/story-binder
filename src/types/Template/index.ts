export default interface Template {
  id: string;
  name: string;
  description: string;
  type: "form" | "editor";
  /**
   * The content of the template, can be used to pre-populate the form or generate a value
   * It will determine the structure of the template
   * Although it is string, it is a valid json if it is form, and corresponds to
   * { [id: string]: TemplateFormContentType }
   * If it is editor, it contains HTML
   */
  content: string;
}
