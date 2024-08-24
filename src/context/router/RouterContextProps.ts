import Path from "@/types/Path";

export interface RouterContextProps<T> {
  navigate: (path: Path, params?: T) => void;
  goBack: (() => void) | null;
  _lastPath: string;
  params: T;
}
