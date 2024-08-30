import { useContext } from "react";
import Context from "./Context";

export function useProject() {
  return useContext(Context);
}
