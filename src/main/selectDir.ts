import { dialog } from "electron";

export default async function selectDir(): Promise<string> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  return filePaths[0];
}
