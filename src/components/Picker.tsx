import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

export default function Picker({
  value,
  onUpdate,
  label,
  list,
}: {
  value: string;
  onUpdate: (value: string) => void;
  label: string;
  list: { value: string; label: string; description?: string }[];
}) {
  const currentItem = list.find((item) => item.value === value);
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onUpdate(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {currentItem?.description || "No template selected"}
      </FormHelperText>
    </FormControl>
  );
}
