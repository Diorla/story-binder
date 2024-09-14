import JSONParse from "@/scripts/JSONParse";
import { useEffect, useState } from "react";

/**
 * This is basically useState, but with a back-up using localStorage
 * so that the state persists between reloads, navigation and app closing
 * @param key the state key
 * @param value the initial value
 */
export default function useContextState<T>(
  key: string,
  value: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      setState(JSONParse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
