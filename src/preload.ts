import { contextBridge, ipcRenderer } from "electron";
import Payload from "./types/Payload";

contextBridge.exposeInMainWorld("fs", {
  sendMessage: (payload?: Payload) => ipcRenderer.invoke(payload.type, payload),
});
