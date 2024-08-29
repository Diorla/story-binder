import { BrowserWindow } from "electron";

export default function minimizeWindow() {
  const win = BrowserWindow.getFocusedWindow();
  return win.minimize();
}
