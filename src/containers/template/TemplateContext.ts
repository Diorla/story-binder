import { createContext } from "react";

export const TemplateContext = createContext<any>({
  form: null,
  register: () => "",
  handleSubmit: () => null,
  resetForm: () => null,
});
