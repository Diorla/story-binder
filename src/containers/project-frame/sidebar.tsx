/* eslint-disable max-lines */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import IconButton from "@mui/material/IconButton";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Tooltip from "@mui/material/Tooltip";
import DrawerItem from "./DrawerItem";
import { useProject } from "@/context/project/useProject";
import Typography from "@mui/material/Typography";
import { truncateText } from "@/scripts/truncateText";
import { ClickAwayListener, TextField } from "@mui/material";
import { useState } from "react";

export default function Sidebar({
  expanded,
  toggleDrawer,
}: {
  expanded: boolean;
  toggleDrawer: () => void;
}) {
  const { project, createCollection } = useProject();
  const [openForm, setOpenForm] = useState(false);
  const [textField, setTextField] = useState("");
  const [textFieldError, setTextFieldError] = useState("");

  const list: string[] = [];

  const drawerWidth = expanded ? 180 : 40;
  const maxLength = expanded ? 20 : 1;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.3s ease-in-out",
        },
      }}
    >
      <Toolbar variant="dense" />
      <Typography sx={{ cursor: "pointer" }}>
        {truncateText(project.name + project.name, maxLength)}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          {expanded ? (
            <>
              <Tooltip title="New document" placement="top">
                {/* eslint-disable-next-line no-console */}
                <IconButton onClick={() => console.log("note")}>
                  <NoteAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New folder" placement="top">
                <IconButton onClick={() => setOpenForm(true)}>
                  <CreateNewFolderIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </div>
        <IconButton onClick={toggleDrawer}>
          {expanded ? (
            <Tooltip title="Close sidebar">
              <DoubleArrowIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Open sidebar">
              <DoubleArrowIcon style={{ transform: "rotate(180deg)" }} />
            </Tooltip>
          )}
        </IconButton>
      </div>
      <Box sx={{ overflow: "auto" }}>
        {openForm && (
          <ClickAwayListener onClickAway={() => setOpenForm(false)}>
            <TextField
              size="small"
              value={textField}
              error={!!textFieldError}
              helperText={textFieldError}
              onChange={(e) => setTextField(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (textField.length <= 0) {
                    setTextFieldError("name cannot be empty");
                  }
                  // Also check that name does not exist in collection list
                  else {
                    createCollection(textField);
                    setTextField("");
                    setOpenForm(false);
                  }
                }
              }}
            />
          </ClickAwayListener>
        )}
        {expanded ? (
          <List>
            {list.map((text) => (
              <DrawerItem
                key={text}
                text={text}
                onClick={() => console.log(text)}
                active={!!Math.round(Math.random())}
              />
            ))}
          </List>
        ) : null}
      </Box>
    </Drawer>
  );
}
