import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import { createContext } from "react";

const AppContext = createContext(INITIAL_USER_INFO);

export default AppContext;
