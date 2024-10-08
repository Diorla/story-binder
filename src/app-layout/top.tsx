import icon from "@/assets/icon";
import BROWSER from "@/constants/BROWSER";
import { Close, FilterNone, Remove } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { Square } from "lucide-react";
import { useEffect, useState } from "react";

export default function Top() {
  const theme = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [loading, setLoading] = useState(true);

  const checkFullScreen = () => {
    window.api
      .sendMessage({
        type: "get-window-info",
      })
      .then((value) => {
        const { isFullScreen = false } = value as { isFullScreen: boolean };
        setIsFullScreen(isFullScreen);
        setLoading(false);
      });
  };

  useEffect(() => {
    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);
  }, []);

  const minimizeWindow = () => {
    window.api
      .sendMessage({ type: "minimize-window" })
      .then((value) => setIsFullScreen(value as boolean));
  };

  const maximizeWindow = () => {
    window.api
      .sendMessage({ type: "toggle-window" })
      .then((value) => setIsFullScreen(value as boolean));
  };

  const closeWindow = () => {
    window.api.sendMessage({ type: "close-window" });
  };

  if (loading) return null;
  return (
    <div
      className="row"
      id="app-bar"
      style={{
        zIndex: theme.zIndex.drawer + 1,
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: theme.palette.grey[50],
        justifyContent: "space-between",
        alignItems: "center",
        height: BROWSER.TOP,
      }}
      color="inherit"
    >
      <div
        className="row"
        style={{
          alignItems: "center",
        }}
      >
        <img src={icon} style={{ height: 32, width: 32, marginLeft: 2 }} />
        <Typography>Story binder</Typography>
      </div>
      <div className="row">
        <button
          tabIndex={-1}
          className="window-button"
          onClick={minimizeWindow}
        >
          <Remove fontSize="small" style={{ fontSize: 18 }} />
        </button>
        <button
          tabIndex={-1}
          className="window-button"
          onClick={maximizeWindow}
        >
          {isFullScreen ? (
            <FilterNone
              fontSize="small"
              style={{ rotate: "180deg", fontSize: 16 }}
            />
          ) : (
            <Square size={16} />
          )}
        </button>
        <button
          tabIndex={-1}
          className="window-button error"
          onClick={closeWindow}
        >
          <Close fontSize="small" />
        </button>
      </div>
    </div>
  );
}
