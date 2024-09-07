import { Box, Button, Chip } from "@mui/material";
import validateData from "../validateData";
import { useState } from "react";
import Input from "@/components/Input";

export default function DataRenderer({
  value,
  setValue,
  type,
}: {
  value: string;
  setValue: (value: string) => void;
  type: "list";
}) {
  const [item, setItem] = useState("");
  const readJSON = async () => {
    const value = (await window.api.sendMessage({
      type: "select-file",
      filter: "db",
    })) as { data: string[] };
    if (validateData(type, value?.data)) {
      setValue(JSON.stringify(value?.data));
    }
  };

  const updateValue = (item: string) => {
    const arr = value ? JSON.parse(value) : [];
    arr.push(item);
    if (validateData(type, arr)) {
      setValue(JSON.stringify(arr));
      setItem("");
    }
  };

  const removeItem = (item: string) => {
    setValue(
      JSON.stringify(JSON.parse(value).filter((i: string) => i !== item))
    );
  };
  return (
    <Box
      sx={{ px: 4, border: "1px solid silver", py: 1, my: 1, borderRadius: 1 }}
    >
      <Button onClick={readJSON}>Load data</Button>
      <Input
        value={item}
        placeholder="Press enter to add item"
        label="Add item"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateValue(item);
          }
        }}
        onChange={(e) => {
          setItem(e.target.value);
        }}
      />
      <Box component="pre" sx={{ my: 1 }}>
        {JSON.parse(value || "[]").map((item: string, index: number) => (
          <Chip key={index} label={item} onDelete={() => removeItem(item)} />
        ))}
      </Box>
    </Box>
  );
}
