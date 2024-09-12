import { Box } from "@mui/material";
import FolderCard from "@/components/FolderCard";
import useFolderContext from "./useFolderContext";

export default function FolderList() {
  const { folderList } = useFolderContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {folderList.map((item) => (
        <FolderCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
