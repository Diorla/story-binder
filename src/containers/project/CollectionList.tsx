import { Box } from "@mui/material";
import { useProject } from "./useProject";
import CollectionCard from "./CollectionCard";

export default function CollectionList() {
  const { collection } = useProject();
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {collection.map((item) => (
        <CollectionCard item={item} />
      ))}
    </Box>
  );
}
