import { Box } from "@mui/material";
import DocumentCard from "./DocumentCard";
import useCollectionContext from "./useCollectionContext";

export default function DocumentList() {
  const { documentList } = useCollectionContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {documentList.map((item) => (
        <DocumentCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
