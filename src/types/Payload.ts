import { FilterType } from "./Filter";

// Used to reduce window size
export type MinimizeWindow = {
  type: "minimize-window";
};

// Used to expand window size to max
export type MaximizeWindow = {
  type: "toggle-window";
};

// used to close window
export type CloseWindow = {
  type: "close-window";
};

// not if window is small or full
export type GetWindowInfo = {
  type: "get-window-info";
};

export type ReadFile = {
  type: "read-file";
  path: string;
  defaultContent?: string;
};

export type WriteFile = {
  type: "write-file";
  path: string;
  content: string;
};

export type SelectDirectory = {
  type: "select-directory";
};

export type ReadDirectory = {
  type: "read-directory";
  path: string;
};

export type Prompt = {
  type: "prompt";
  data: {
    title: string;
    message: string;
    accept?: string;
    cancel?: string;
  };
};

export type CreateDirectory = {
  type: "create-directory";
  path: string;
};

export type SelectFile = {
  type: "select-file";
  filter: FilterType;
};

export type DuplicateDirectory = {
  type: "duplicate-directory";
  path: string;
};

export type DuplicateFile = {
  type: "duplicate-file";
  path: string;
};

export type DeleteDirectory = {
  type: "delete-directory";
  path: string;
};

export type DeleteFile = {
  type: "delete-file";
  path: string;
};

type Payload =
  | MinimizeWindow
  | MaximizeWindow
  | CloseWindow
  | GetWindowInfo
  | ReadFile
  | WriteFile
  | SelectDirectory
  | ReadDirectory
  | Prompt
  | CreateDirectory
  | SelectFile
  | DuplicateDirectory
  | DuplicateFile
  | DeleteDirectory
  | DeleteFile;

export default Payload;
