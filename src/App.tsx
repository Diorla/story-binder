import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import THEME from "./constants/THEME";
import RouterProvider from "./context/router";
import AppProvider from "./context/app";
import "./styles/reset.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/editor.css";
import "./styles/base.css";
import AppLayout from "./app-layout";

const root = createRoot(document.getElementById("app"));

root.render(
  <ThemeProvider theme={THEME}>
    <AppLayout>
      <AppProvider>
        <RouterProvider />
      </AppProvider>
    </AppLayout>
  </ThemeProvider>
);
