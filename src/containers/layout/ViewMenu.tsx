import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MenuWrapper from "./MenuWrapper";
import MenuButton from "./MenuButton";

export default function ViewMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="file-menu">
      <MenuButton onClick={handleClick} label="View" />
      <MenuWrapper anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Full Screen</MenuItem>
        <MenuItem onClick={handleClose}>Theme</MenuItem>
        <MenuItem onClick={handleClose}>Zoom in</MenuItem>
        <MenuItem onClick={handleClose}>Zoom out</MenuItem>
      </MenuWrapper>
    </div>
  );
}
