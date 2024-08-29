import Payload from "@/types/Payload";
import getWindowInfo from "./getWindowInfo";
import minimizeWindow from "./minimizeWindow";
import toggleWindow from "./toggleWindow";
import { app } from "electron";
import readFile from "./readFile";
import selectDirectory from "./selectDirectory";
import writeFile from "./writeFile";

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
    default:
      return null;
  }
}
