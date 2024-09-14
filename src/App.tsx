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
import "./styles/global.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import AppLayout from "./app-layout";

const root = createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <ThemeProvider theme={THEME}>
    <AppLayout>
      <AppProvider>
        <RouterProvider />
      </AppProvider>
    </AppLayout>
  </ThemeProvider>
);
