// export type PayloadType =
//   | "write-file"
//   | "write-directory"
//   | "read-file"
//   | "read-directory"
//   | "rename-file"
//   | "rename-directory"
//   | "delete-file"
//   | "delete-directory";

// export default interface Payload {
//   type: PayloadType;
//   data?: unknown;
// }

// used to hide the window
export type CollapseWindow = {
  type: "collapse-window";
};

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

type Payload =
  | CollapseWindow
  | MinimizeWindow
  | MaximizeWindow
  | CloseWindow
  | GetWindowInfo
  | ReadFile
  | WriteFile
  | SelectDirectory;

export default Payload;
