import { dialog } from "electron";

export default async function selectDirectory(): Promise<string> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  return filePaths[0];
}
