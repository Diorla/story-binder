import { Box } from "@mui/material";
import CollectionCard from "@/components/CollectionCard";
import useProjectContext from "./useProjectContext";

export default function CollectionList() {
  const { collection } = useProjectContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {collection.map((item) => (
        <CollectionCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
