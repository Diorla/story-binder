import { app, BrowserWindow, ipcMain, safeStorage } from "electron";
import path from "path";
import readFile from "./main/readFile";
import writeFile from "./main/writeFile";
import selectDir from "./main/selectDir";
import readDirectory from "./main/readDirectory";
import writeDirectory from "./main/writeDirectory";
import renameDirectory from "./main/renameDirectory";
import selectFile from "./main/selectFile";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Change this to only dev mode
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
  /**
   *   | "create-file"
  | "create-directory"
  | "update-file"
  | "update-directory"
  | "delete-file"
  | "delete-directory"
   */
  ipcMain.handle("read-file", (_e, args) => {
    const defaultContent = safeStorage.encryptString(args.content || "");
    const value = readFile(args.dir, defaultContent);
    return safeStorage.decryptString(value).toString();
  });
  ipcMain.handle("read-directory", (_e, args) => {
    const dir = readDirectory(args.dir);
    return dir;
  });
  ipcMain.handle("rename-directory", (_e, args) => {
    const dir = renameDirectory(args.dir, args.content);
    return dir;
  });
  ipcMain.handle("write-file", (_e, args) => {
    const defaultContent = safeStorage.encryptString(args.content);
    const value = writeFile(args.dir, defaultContent);
    return safeStorage.decryptString(value).toString();
  });
  ipcMain.handle("write-directory", (_e, args) => {
    const dir = writeDirectory(args.dir);
    return dir;
  });

  ipcMain.handle("select-dir", () => {
    return selectDir();
  });

  ipcMain.handle("select-file", (_e, args) => {
    return selectFile(args);
  });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
