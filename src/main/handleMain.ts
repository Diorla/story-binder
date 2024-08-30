import Payload from "@/types/Payload";
import getWindowInfo from "./getWindowInfo";
import minimizeWindow from "./minimizeWindow";
import toggleWindow from "./toggleWindow";
import { app } from "electron";
import readFile from "./readFile";
import selectDirectory from "./selectDirectory";
import writeFile from "./writeFile";
import readDirectory from "./readDirectory";
import openPrompt from "./openPrompt";
import selectFile from "./selectFile";
import createDirectory from "./createDirectory";
import duplicateDirectory from "./duplicateDirectory";
import deleteDirectory from "./deleteDirectory";
import deleteFile from "./deleteFile";

export default function handleMain(params: Payload) {
  const { type } = params;

  console.log("type:", type);

  switch (type) {
    case "get-window-info":
      return getWindowInfo();
    case "minimize-window":
      return minimizeWindow();
    case "toggle-window":
      return toggleWindow();
    case "close-window":
      return app.quit();
    case "read-file":
      return readFile(params);
    case "select-directory":
      return selectDirectory();
    case "write-file":
      return writeFile(params);
    case "read-directory":
      return readDirectory(params.path);
    case "prompt":
      return openPrompt(params);
    case "create-directory":
      return createDirectory(params.path);
    case "select-file":
      return selectFile(params.filter);
    case "duplicate-directory":
      return duplicateDirectory(params.path);
    case "delete-directory":
      return deleteDirectory(params.path);
    case "delete-file":
      return deleteFile(params.path);
    default:
      return null;
  }
}
