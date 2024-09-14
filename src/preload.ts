import { contextBridge, ipcRenderer } from "electron";
import Payload from "./types/Payload";
// import { FilterType } from "./types/Filter";
// import PromptProps from "./types/PromptProps";

// contextBridge.exposeInMainWorld("fs", {
//   sendMessage: (payload?: Payload) => ipcRenderer.invoke(payload.type, payload),
// });

// contextBridge.exposeInMainWorld("dialog", {
//   selectDir: () => ipcRenderer.invoke("select-dir"),
//   selectFile: (args: FilterType) => ipcRenderer.invoke("select-file", args),
//   prompt: (args: PromptProps) => ipcRenderer.invoke("prompt", args),
// });

contextBridge.exposeInMainWorld("api", {
  sendMessage: (payload: Payload) => ipcRenderer.invoke("api", payload),
});
