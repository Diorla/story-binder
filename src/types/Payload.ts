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
type CollapseWindow = {
  type: "collapse-window";
};

// Used to reduce window size
type MinimizeWindow = {
  type: "minimize-window";
};

// Used to expand window size to max
type MaximizeWindow = {
  type: "toggle-window";
};

// used to close window
type CloseWindow = {
  type: "close-window";
};

// not if window is small or full
type GetWindowInfo = {
  type: "get-window-info";
};

type Payload =
  | CollapseWindow
  | MinimizeWindow
  | MaximizeWindow
  | CloseWindow
  | GetWindowInfo;

export default Payload;
