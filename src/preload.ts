import { contextBridge, ipcRenderer } from "electron";
import Payload from "./types/Payload";
import { FilterType } from "./types/Filter";

contextBridge.exposeInMainWorld("fs", {
  sendMessage: (payload?: Payload) => ipcRenderer.invoke(payload.type, payload),
});

contextBridge.exposeInMainWorld("dialog", {
  selectDir: () => ipcRenderer.invoke("select-dir"),
  selectFile: (args: FilterType) => ipcRenderer.invoke("select-file", args),
});
