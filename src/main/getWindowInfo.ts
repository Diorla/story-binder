import { BrowserWindow } from "electron";

export default function getWindowInfo() {
  const win = BrowserWindow.fromId(Number(process.env.MainWindowId));

  return {
    isMaximized: win?.isMaximized(),
    isMinimized: win?.isMinimized(),
    isFullScreen: win?.isMaximized(),
  };
}
