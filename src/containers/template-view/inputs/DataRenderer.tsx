import { Box, Button } from "@mui/material";
import validateData from "../validateData";

export default function DataRenderer({
  value,
  setValue,
  type,
}: {
  value: string;
  setValue: (value: string) => void;
  type: "list";
}) {
  const readJSON = async () => {
    const value = (await window.api.sendMessage({
      type: "select-file",
      filter: "db",
    })) as { data: string[] };
    if (validateData(type, value?.data)) {
      setValue(JSON.stringify(value?.data));
    }
  };

  return (
    <Box>
      <Button onClick={readJSON}>Load data</Button>
      <Box component="pre">{value && JSON.parse(value).join(", ")}</Box>
    </Box>
  );
}
