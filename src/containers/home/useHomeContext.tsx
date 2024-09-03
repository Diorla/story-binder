import { useContext } from "react";
import { HomeContext } from "./HomeContext";

export default function useHomeContext() {
  return useContext(HomeContext);
}
