import BROWSER from "@/constants/BROWSER";
import {
  AddCircleOutline,
  DeleteOutline,
  FileCopyOutlined,
  HelpOutline,
  HomeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import SidebarButton from "./SidebarButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <Box id="browser" style={{ minHeight: BROWSER.HEIGHT }}>
      <div
        style={{
          backgroundColor: theme.palette.grey[100],
          width: BROWSER.MARGIN,
          position: "fixed",
          height: BROWSER.HEIGHT,
          left: 0,
          top: BROWSER.MARGIN,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          <SidebarButton title="View all projects" path="home">
            <HomeOutlined />
          </SidebarButton>
          <SidebarButton title="Add projects" path="create-project">
            <AddCircleOutline />
          </SidebarButton>
          <SidebarButton title="Templates" path="templates">
            <FileCopyOutlined />
          </SidebarButton>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          <SidebarButton title="Help" path="help">
            <HelpOutline />
          </SidebarButton>
          <SidebarButton title="Trash" path="trash">
            <DeleteOutline />
          </SidebarButton>
          <SidebarButton title="Settings" path="settings">
            <SettingsOutlined />
          </SidebarButton>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          width: `calc(100vw - ${BROWSER.MARGIN}px)`,
          left: BROWSER.MARGIN,
          top: BROWSER.MARGIN,
          height: BROWSER.HEIGHT,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </Box>
  );
}
