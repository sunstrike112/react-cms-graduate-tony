import * as React from "react";

// material core
import { createTheme, ThemeProvider } from "@mui/material/styles";

// components
import Spinner from "components/Spinner";

// Routes
import RoutesMain from "routes/Routes";

export default function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <RoutesMain />

      <Spinner />
    </ThemeProvider>
  );
}
