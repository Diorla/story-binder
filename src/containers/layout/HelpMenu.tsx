import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MenuWrapper from "./MenuWrapper";
import MenuButton from "./MenuButton";

export default function HelpMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="help-menu">
      <MenuButton onClick={handleClick} label="Help" />
      <MenuWrapper anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Welcome</MenuItem>
        <MenuItem onClick={handleClose}>Documentation</MenuItem>
        <MenuItem onClick={handleClose}>Release Notes</MenuItem>
        <MenuItem onClick={handleClose}>Keyboard shortcuts</MenuItem>
        <MenuItem onClick={handleClose}>Video Tutorials</MenuItem>
        <MenuItem onClick={handleClose}>Tips and Tricks</MenuItem>
        <MenuItem onClick={handleClose}>Feature request</MenuItem>
        <MenuItem onClick={handleClose}>Report issue</MenuItem>
        <MenuItem onClick={handleClose}>Privacy statement</MenuItem>
        <MenuItem onClick={handleClose}>Check for Updates</MenuItem>
        <MenuItem onClick={handleClose}>About</MenuItem>
      </MenuWrapper>
    </div>
  );
}
