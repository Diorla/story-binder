import { Box } from "@mui/material";
import DocCard from "./DocCard";
import useFolderContext from "./useFolderContext";

export default function DocList() {
  const { docList } = useFolderContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {docList.map((item) => (
        <DocCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
