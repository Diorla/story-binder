import FUNCTION_REGEX from "@/constants/FUNCTION_REGEX";
import FnList from "./FnList";

export default function generateFunctionList(template: string): FnList {
  const matches = template.match(FUNCTION_REGEX);
  return matches || [];
}
