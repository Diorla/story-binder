import { createContext } from "react";
import { RouterContextProps } from "./RouterContextProps";

const RouterContext = createContext<RouterContextProps<unknown>>({
  navigate: () => undefined,
  goBack: null,
  _lastPath: "home",
  params: null,
});

export default RouterContext;
