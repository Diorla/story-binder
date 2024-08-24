import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import THEME from "./constants/THEME";
import "./reset.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import RouterProvider from "./context/router";
import ErrorBoundary from "./containers/error-boundary";
import Initiation from "./containers/initiation";

const root = createRoot(document.getElementById("app"));

root.render(
  <ThemeProvider theme={THEME}>
    <ErrorBoundary>
      <Initiation>
        <RouterProvider />
      </Initiation>
    </ErrorBoundary>
  </ThemeProvider>
);
