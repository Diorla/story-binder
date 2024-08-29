import Payload from "@/types/Payload";
import getWindowInfo from "./getWindowInfo";
import minimizeWindow from "./minimizeWindow";
import toggleWindow from "./toggleWindow";
import { app } from "electron";

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
    default:
      return null;
  }
}
