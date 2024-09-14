import Filter from "@/types/Filter";
import APP_FILE_EXT from "./APP_FILE_EXT";

const FILE_FILTERS: Filter = {
  images: { name: "Images", extensions: ["jpg", "png", "gif"] },
  pdf: { name: "PDF Files", extensions: ["pdf"] },
  all: { name: "All Files", extensions: ["*"] },
  db: { name: "Database", extensions: ["json"] },
  app: { name: "App files", extensions: [APP_FILE_EXT] },
};

export default FILE_FILTERS;
