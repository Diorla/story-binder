import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MenuWrapper from "./MenuWrapper";
import MenuButton from "./MenuButton";

export default function EditMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="edit-menu">
      <MenuButton onClick={handleClick} label="Edit" />
      <MenuWrapper anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Undo</MenuItem>
        <MenuItem onClick={handleClose}>Redo</MenuItem>
        <MenuItem onClick={handleClose}>Duplicate</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </MenuWrapper>
    </div>
  );
}
