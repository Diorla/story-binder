import { createContext } from "react";
import HomeContextProps from "./HomeContextProps";

export const HomeContext = createContext<HomeContextProps>({
  projects: [],
  reloadProjects: () => undefined,
});
