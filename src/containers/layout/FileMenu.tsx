import useRouter from "@/context/router/useRouter";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MenuWrapper from "./MenuWrapper";
import MenuButton from "./MenuButton";

export default function FileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { navigate } = useRouter();

  return (
    <div id="file-menu">
      <MenuButton onClick={handleClick} label="File" />
      <MenuWrapper anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            navigate("create-project");
            handleClose();
          }}
        >
          New project
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("home");
            handleClose();
          }}
        >
          Open project
        </MenuItem>
        {/* It would ask if user wants to migrate all their projects to a new
        workspace */}
        <MenuItem onClick={handleClose}>Change workspace</MenuItem>
        <MenuItem onClick={handleClose}>Export</MenuItem>
        <MenuItem onClick={handleClose}>Import</MenuItem>
        <MenuItem onClick={handleClose}>Print file</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Exit</MenuItem>
      </MenuWrapper>
    </div>
  );
}
