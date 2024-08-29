import Path from "@/types/Path";

export interface RouterContextProps<T> {
  /**
   * Used to move from one screen to another
   * @param path the next screen
   * @param params extra params that may be used in the next screen/page
   * @returns void
   */
  navigate: (path: Path, params?: T) => void;
  /**
   * Used to go back to the previous screen
   * @returns void
   */
  goBack: (() => void) | null;
  /**
   * Indicates the last path the user was on.
   * This is a private variable that should be used in router context alone
   * for errors
   */
  _lastPath: Path;
  /**
   * current params from navigate function
   */
  params: T;
  /**
   * Used to indicate if the current screen is dirty
   * and the user should be prompted to save changes
   * before navigating away
   * @param params boolean
   * @returns void
   */
  setIsDirty: (params: boolean) => void;
  /**
   * Well, I don't want to be updating setDirty all the time
   */
  isDirty: boolean;
}
