import { Box, Button, Chip } from "@mui/material";
import { useState } from "react";
import Input from "@/components/Input";
import JSONParse from "@/scripts/JSONParse";

export default function DataRenderer({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [item, setItem] = useState("");
  const readJSON = async () => {
    const value = (await window.api.sendMessage({
      type: "select-file",
      filter: "db",
    })) as { data: string[] };
    setValue(JSON.stringify(value?.data));
  };

  const result = JSONParse(value);
  const arr: string[] = Array.isArray(result) ? result : [];

  const updateValue = (item: string) => {
    if (arr.includes(item)) return;
    arr.push(item);
    setValue(JSON.stringify(arr));
    setItem("");
  };

  const removeItem = (item: string) => {
    setValue(JSON.stringify(arr.filter((i: string) => i !== item)));
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
        {arr.map((item: string, index: number) => (
          <Chip key={index} label={item} onDelete={() => removeItem(item)} />
        ))}
      </Box>
    </Box>
  );
}
