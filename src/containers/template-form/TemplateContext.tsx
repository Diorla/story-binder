import { createContext } from "react";
import TemplateContextProps from "./TemplateContextProps";

export const TemplateContext = createContext<TemplateContextProps>({
  form: null,
  register: () => null,
  handleSubmit: () => null,
  resetForm: () => null,
});
