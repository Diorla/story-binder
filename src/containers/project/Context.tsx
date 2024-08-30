import { createContext } from "react";
import ContextProps from "./ContextProps";

const Context = createContext<ContextProps>({
  project: null,
  collection: null,
  selectedCollection: null,
  selectedDocument: null,
  selectItem: null,
  createCollection: null,
  // updateProject: null,
  // createCollection: null,
  // collection: [],
  // selected: null,
  // setSelected: null,
  // expandedCollection: null,
  // toggleExpanded: null,
});

export default Context;
