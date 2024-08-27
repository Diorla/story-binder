import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import { createContext } from "react";
import AppContextProps from "./AppContextProps";

const AppContext = createContext<AppContextProps>({
  userInfo: INITIAL_USER_INFO,
  changeWorkspace: () => "{}",
});

export default AppContext;
