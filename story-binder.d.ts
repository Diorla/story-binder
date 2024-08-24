import { FilterType } from "@/types/Filter";
import Payload from "@/types/Payload";

export interface IpcRenderer {
  sendMessage: (payload: Payload) => Promise<unknown>;
  selectDir: () => Promise<string>;
  selectFile: (fileType: FilterType) => Promise<string>;
}

// Interaction with file system
interface FS {
  sendMessage: (payload: Payload) => Promise<unknown>;
}

interface Dialog {
  selectDir: () => Promise<string>;
  selectFile: (fileType: FilterType) => Promise<string>;
}

declare global {
  interface Window {
    fs: FS;
    dialog: Dialog;
  }
}
