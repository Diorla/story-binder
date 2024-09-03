import { createContext } from "react";
import { RouterContextProps } from "./RouterContextProps";

const RouterContext = createContext<RouterContextProps<unknown>>({
  navigate: null,
  goBack: null,
  _lastPath: "home",
  params: null,
});

export default RouterContext;
