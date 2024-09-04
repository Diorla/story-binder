import { Box } from "@mui/material";
import CollectionCard from "@/components/CollectionCard";
import useCollectionContext from "./useCollectionContext";

export default function CollectionList() {
  const { collectionList } = useCollectionContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {collectionList.map((item) => (
        <CollectionCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
