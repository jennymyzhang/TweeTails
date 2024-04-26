import App from "./App"
import React, {Component} from "react";
import { createRoot } from 'react-dom/client';
import ContextProvider from './context/ContextProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ScopedCssBaseline } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: '#3C2A21',
    },
    secondary: {
      main: '#3C2A21',
    },
    info: {
        main: '#3C2A21',
   },
   background: {
        default: "#FFF6DC"
      }
   
  },
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <ScopedCssBaseline enableColorScheme>
  <ContextProvider>
    <App />
  </ContextProvider>
  </ScopedCssBaseline>
            </ThemeProvider>
);