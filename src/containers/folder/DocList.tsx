import { Box } from "@mui/material";
import DocCard from "./DocCard";
import useFolderContext from "./useFolderContext";

export default function DocList() {
  const { docList } = useFolderContext();

  return (
    <Box className="flex flex-wrap justify-evenly">
      {docList.map((item) => (
        <DocCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
