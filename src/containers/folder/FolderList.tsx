import { Box, Divider } from "@mui/material";
import FolderCard from "@/components/FolderCard";
import useFolderContext from "./useFolderContext";

export default function FolderList() {
  const { folderList } = useFolderContext();

  if (folderList.length)
    return (
      <>
        <Box className="flex flex-wrap justify-evenly">
          {folderList.map((item) => (
            <FolderCard key={item.id} item={item} />
          ))}
        </Box>
        <Divider />
      </>
    );
  return null;
}
