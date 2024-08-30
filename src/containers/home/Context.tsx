import { createContext } from "react";

const Context = createContext({
  projects: [],
  reload: () => undefined,
});

export default Context;
