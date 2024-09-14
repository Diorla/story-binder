import { useContext } from "react";
import { TemplateContext } from "./TemplateContext";
import TemplateContextProps from "./TemplateContextProps";

export default function useTemplateContext() {
  return useContext<TemplateContextProps>(TemplateContext);
}
