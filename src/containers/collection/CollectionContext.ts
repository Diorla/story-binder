import { createContext } from "react";
import CollectionContextProps from "./CollectionContextProps";
import { defaultCollection } from "./defaultCollection";

export const CollectionContext = createContext<CollectionContextProps>({
  collection: defaultCollection,
  currentDir: "",
  collectionList: [],
  reload: () => "",
  documentList: [],
});
