import { useProject } from "@/context/project/useProject";
import { ClickAwayListener, TextField } from "@mui/material";
import toLowerCase from "./toLowerCase";
import useLocalState from "@/hooks/useLocalState";

export default function CollectionInput({
  visible,
  closeForm,
}: {
  visible: boolean;
  closeForm: () => void;
}) {
  const [textField, setTextField] = useLocalState("collection-input-text", "");
  const [textFieldError, setTextFieldError] = useLocalState(
    "collection-input-error",
    ""
  );
  const { createCollection, collection } = useProject();

  if (visible)
    return (
      <div>
        <ClickAwayListener onClickAway={closeForm}>
          <TextField
            size="small"
            value={textField}
            error={!!textFieldError}
            helperText={textFieldError}
            onChange={(e) => setTextField(e.target.value)}
            onFocus={() => setTextFieldError("")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (textField.length <= 0) {
                  setTextFieldError("name cannot be empty");
                } else if (
                  collection.map(toLowerCase).includes(textField.toLowerCase())
                ) {
                  setTextFieldError("name already exists");
                } else {
                  createCollection(textField);
                  setTextField("");
                  closeForm();
                }
              }
            }}
          />
        </ClickAwayListener>
      </div>
    );
  return null;
}
