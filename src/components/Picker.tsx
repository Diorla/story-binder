import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText, SxProps, Theme } from "@mui/material";

export default function Picker({
  value,
  onUpdate,
  label,
  list,
  sx,
}: {
  value: string;
  onUpdate: (value: string) => void;
  label: string;
  list: { value: string; label: string; description?: string }[];
  sx?: SxProps<Theme>;
}) {
  const currentItem = list.find((item) => item.value === value);
  let description = "Nothing selected";
  if (currentItem?.description) {
    description = currentItem.description;
  }

  return (
    <FormControl sx={{ minWidth: 120, width: "100%", ...sx }}>
      <InputLabel size="small">{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onUpdate(e.target.value)}
        size="small"
      >
        {value ? null : (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {list.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{description}</FormHelperText>
    </FormControl>
  );
}
