import { useContext } from "react";
import Context from "./Context";

export default function useProjects() {
  return useContext(Context);
}
