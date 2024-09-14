import { Box } from "@mui/material";
import FolderCard from "@/components/FolderCard";
import useProjectContext from "./useProjectContext";

export default function FolderList() {
  const { folder } = useProjectContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {folder.map((item) => (
        <FolderCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
