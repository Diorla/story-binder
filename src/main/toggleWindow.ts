import { BrowserWindow } from "electron";

export default function toggleWindow() {
  const win = BrowserWindow.getFocusedWindow();

  if (win.isMaximized()) {
    win.unmaximize();
    return false;
  }
  win.maximize();
  return true;
}
