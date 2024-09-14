import { TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

export default function EditableContent({
  value,
  updateValue,
  multiline,
  textStyle,
}: {
  value: string;
  updateValue: (value: string) => void;
  multiline?: boolean;
  textStyle?: { [key: string]: string | number };
}) {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);
  const handleClick = () => {
    setIsEdit(true);
  };

  useClickAway(ref, () => {
    setIsEdit(false);
    updateValue(inputValue);
  });

  useEffect(() => {
    if (isEdit && ref.current) {
      ref.current.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          setIsEdit(false);
          updateValue(inputValue);
        }
      });
    }
  }, [inputValue, isEdit, updateValue]);

  if (isEdit)
    return (
      <TextField
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={ref}
        multiline={multiline}
        rows={5}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      />
    );
  return (
    <Typography
      onClick={handleClick}
      style={{
        ...textStyle,
        minWidth: 100,
        minHeight: 30,
      }}
    >
      {value}
    </Typography>
  );
}
