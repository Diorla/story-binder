import { Tooltip, Button } from "@mui/material";
import FormatButtonProps from "./FormatButtonProps";

export default function FormatButton(props: FormatButtonProps) {
  const { tooltip } = props;
  return (
    <Tooltip title={tooltip}>
      <Button
        size="small"
        {...props}
        variant="contained"
        sx={{
          m: 0.5,
          p: 0,
          "& svg": {
            fontSize: "1.2rem",
          },
        }}
      />
    </Tooltip>
  );
}
