import { useContext } from "react";
import { AppContext } from ".";

export default function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
