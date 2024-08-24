import { createContext } from "react";
import { RouterContextProps } from "./RouterContextProps";

const RouterContext = createContext<RouterContextProps<unknown>>({
  navigate: null,
  goBack: null,
  _lastPath: "",
  params: null,
});

export default RouterContext;
