import { createTheme } from "@mui/material/styles";
import { brown, teal } from "@mui/material/colors";

const THEME = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
    secondary: {
      main: teal[50],
    },
  },
});

export default THEME;
