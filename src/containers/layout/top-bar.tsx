import AppBar from "@mui/material/AppBar";
import FileMenu from "./FileMenu";
import ViewMenu from "./ViewMenu";
import HelpMenu from "./HelpMenu";
import EditMenu from "./EditMenu";
import Button from "@mui/material/Button";

export default function BasicMenu() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      color="secondary"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FileMenu />
          <ViewMenu />
          <EditMenu />
          <HelpMenu />
        </div>
        <Button color="inherit" size="small">
          View Templates
        </Button>
      </div>
    </AppBar>
  );
}
