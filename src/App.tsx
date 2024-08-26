import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import THEME from "./constants/THEME";
import RouterProvider from "./context/router";
import AppProvider from "./context/app";
import "./reset.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./editor.css";

const root = createRoot(document.getElementById("app"));

root.render(
  <ThemeProvider theme={THEME}>
    <AppProvider>
      <RouterProvider />
    </AppProvider>
  </ThemeProvider>
);
