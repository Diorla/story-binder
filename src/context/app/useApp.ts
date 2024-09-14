import { useContext } from "react";
import AppContext from "./AppContext";
import AppContextProps from "./AppContextProps";

export default function useApp() {
  const context = useContext<AppContextProps>(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
