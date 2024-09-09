import { useContext } from "react";
import { CollectionContext } from "./CollectionContext";

export default function useCollectionContext() {
  return useContext(CollectionContext);
}
