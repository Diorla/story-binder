import { Box } from "@mui/material";
import CollectionView from "./CollectionView";

// TODO: Add grouping
/**
 * So if you drag one item over the other, you can group them together.
 * This is aesthetic and can make it easier for people to group related categories
 * instead of nested collections like in a file explorer.
 * For example, you can create a categories like "Main", "Secondary", "Tertiary"
 * and put them in "Characters" instead of creating a long list of characters
 */
export default function Collection() {
  return (
    <Box>
      <CollectionView />
    </Box>
  );
}
