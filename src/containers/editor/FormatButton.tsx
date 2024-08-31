import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

export default function FormatButton(props: {
  tooltip: string;
  children: ReactElement<unknown, any>;
}) {
  const { tooltip, children } = props;

  return (
    <Tooltip title={tooltip} style={{ cursor: "pointer" }}>
      {children}
    </Tooltip>
  );
}
