import { useContext } from "react";
import AppContext from "./AppContext";
import UserInfo from "@/types/UserInfo";

export default function useApp() {
  const context = useContext<UserInfo>(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
