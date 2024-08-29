import useApp from "@/context/app/useApp";
import useRouter from "@/context/router/useRouter";
import { Add, Home, Workspaces } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function TopBar() {
  const { navigate, _lastPath } = useRouter();
  const { changeWorkspace } = useApp();

  return (
    <AppBar
      id="app-bar"
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
          {!(_lastPath === "home") && (
            <Button
              onClick={() => navigate("home")}
              style={{ textTransform: "inherit" }}
              color="inherit"
              size="small"
            >
              <Tooltip title="Home">
                <Home />
              </Tooltip>
            </Button>
          )}
          {!(_lastPath === "create-project") && (
            <Button
              onClick={() => navigate("create-project")}
              style={{ textTransform: "inherit" }}
              color="inherit"
              size="small"
            >
              <Tooltip title="New project">
                <Add />
              </Tooltip>
            </Button>
          )}
          <Button
            onClick={changeWorkspace}
            style={{ textTransform: "inherit" }}
            color="inherit"
            size="small"
          >
            <Tooltip title="Change workspace">
              <Workspaces />
            </Tooltip>
          </Button>
        </div>
        <Button color="inherit" size="small">
          View Templates
        </Button>
      </div>
    </AppBar>
  );
}
