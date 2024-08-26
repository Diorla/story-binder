import FILE_FILTERS from "@/constants/FILE_FILTERS";
import imageToDataUri from "@/scripts/imageToDataUri";
import { FilterType } from "@/types/Filter";
import { dialog } from "electron";

export default async function selectFile(args: FilterType): Promise<string> {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [FILE_FILTERS[args]],
  });

  if (args === "images") return imageToDataUri(filePaths[0]);
  return filePaths[0];
}
