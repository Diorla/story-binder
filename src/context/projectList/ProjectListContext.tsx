import { createContext } from "react";

export const ProjectListContext = createContext({
  projects: [],
  reload: () => undefined,
});
