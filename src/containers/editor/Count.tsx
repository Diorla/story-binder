import { Typography } from "@mui/material";
import { useCurrentEditor } from "@tiptap/react";

/**
 * Mass market paperbacks (pocket books): 4.25" x 6.87"
 * Trade paperback (novels): 5.5" x 8.5" (Digest) or 6" x 9" (US trade)
 * Hard cover (novels): 6" x 9" to 8.5" x 11"
 * =====
 * Pocket books 4.25 by 6.87
 * Hello
 */
export default function Count() {
  const { editor } = useCurrentEditor();

  return (
    <div>
      <Typography>{editor.storage.characterCount.words()} words</Typography>
    </div>
  );
}
