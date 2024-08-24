import Payload from "@/types/Payload";

export interface IpcRenderer {
  sendMessage: (payload: Payload) => Promise<unknown>;
}

// Interaction with file system
interface FS {
  sendMessage: (payload: Payload) => Promise<unknown>;
}

declare global {
  interface Window {
    fs: FS;
  }
}
