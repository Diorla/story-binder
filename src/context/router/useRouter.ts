import { Context, useContext } from "react";
import RouterContext from "./RouterContext";
import { RouterContextProps } from "./RouterContextProps";

export default function useRouter<T>() {
  return useContext<RouterContextProps<T>>(
    RouterContext as Context<RouterContextProps<T>>
  );
}
