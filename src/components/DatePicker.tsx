import { Box, FormControl } from "@mui/material";
import ReactDatePicker from "react-datepicker";

export default function DatePicker({
  date,
  setDate,
  label,
}: {
  date: number;
  setDate: (date: number) => void;
  label?: string;
}) {
  return (
    <FormControl
      sx={{ border: "1px solid silver", borderRadius: 1, px: 1, width: "100%" }}
    >
      <Box>{label}</Box>
      <ReactDatePicker
        selected={new Date(date)}
        onChange={(currentDate) => setDate(+new Date(currentDate || date))}
      />
    </FormControl>
  );
}
