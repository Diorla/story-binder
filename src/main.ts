import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import Payload from "./types/Payload";
import handleMain from "./main/handleMain";
// import readFile from "./main/readFile";
// import writeFile from "./main/writeFile";
// import selectDir from "./main/selectDir";
// import readDirectory from "./main/readDirectory";
// import writeDirectory from "./main/writeDirectory";
// import renameDirectory from "./main/renameDirectory";
// import selectFile from "./main/selectFile";
// import openPrompt from "./main/openPrompt";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
    minWidth: 600,
    minHeight: 600,
    frame: false,
    thickFrame: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

app.on("ready", () => {
  ipcMain.handle("api", (_e, args: Payload) => {
    return handleMain(args);
  });
  // ipcMain.handle("read-file", (_e, args) => {
  //   const defaultContent = safeStorage.encryptString(args.content || "");
  //   const value = readFile(args.dir, defaultContent);
  //   return safeStorage.decryptString(value).toString();
  // });
  // ipcMain.handle("read-directory", (_e, args) => {
  //   const dir = readDirectory(args.dir);
  //   return dir;
  // });
  // ipcMain.handle("rename-directory", (_e, args) => {
  //   const dir = renameDirectory(args.dir, args.content);
  //   return dir;
  // });
  // ipcMain.handle("write-file", (_e, args) => {
  //   const defaultContent = safeStorage.encryptString(args.content);
  //   const value = writeFile(args.dir, defaultContent);
  //   return safeStorage.decryptString(value).toString();
  // });
  // ipcMain.handle("write-directory", (_e, args) => {
  //   const dir = writeDirectory(args.dir);
  //   return dir;
  // });

  // ipcMain.handle("select-dir", () => {
  //   return selectDir();
  // });

  // ipcMain.handle("select-file", (_e, args) => {
  //   return selectFile(args);
  // });

  // ipcMain.handle("prompt", (_e, args) => {
  //   return openPrompt(args);
  // });
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
