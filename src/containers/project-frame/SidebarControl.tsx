import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import IconButton from "@mui/material/IconButton";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Tooltip from "@mui/material/Tooltip";

export default function SidebarControl({
  expanded,
  openForm,
  toggleDrawer,
}: {
  expanded: boolean;
  openForm: () => void;
  toggleDrawer: () => void;
}) {
  return (
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
            <Tooltip title="New folder" placement="top">
              <IconButton onClick={openForm}>
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
  );
}
