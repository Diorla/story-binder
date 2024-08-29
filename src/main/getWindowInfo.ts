import { BrowserWindow } from "electron";

export default function getWindowInfo() {
  const win =
    BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];

  return {
    isMaximized: win?.isMaximized(),
    isMinimized: win?.isMinimized(),
    isFullScreen: win?.isMaximized(),
  };
}
