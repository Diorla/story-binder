import { Box, FormControl } from "@mui/material";
import ReactTimePicker from "react-time-picker";

export default function TimePicker({
  label,
  value,
  setTime,
}: {
  label?: string;
  value: string;
  setTime: (value: string) => void;
}) {
  // const [value, onChange] = useState<string>("10:00");

  return (
    <FormControl
      sx={{ border: "1px solid silver", borderRadius: 1, px: 1, width: "100%" }}
    >
      <Box>{label}</Box>
      <ReactTimePicker
        onChange={(value) => setTime(value || "10:00")}
        value={value}
      />
    </FormControl>
  );
}
