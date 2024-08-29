import useRouter from "@/context/router/useRouter";
import { useEffect, useState } from "react";

/**
 * This is basically useState, but with a back-up using localStorage
 * so that the state persists between reloads, navigation and app closing
 * @param key the state key
 * @param value the initial value
 */
export default function useLocalState<T>(
  key: string,
  value: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(value);
  const { _lastPath } = useRouter();

  useEffect(() => {
    const _key = `${key}:${_lastPath}`;
    const storedValue = localStorage.getItem(_key);

    if (storedValue) {
      setState(JSON.parse(storedValue));
    }
  }, [_lastPath, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
