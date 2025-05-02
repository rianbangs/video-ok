import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';

// ✅ Create MUI theme with global font
const theme = createTheme({
  typography: {
    fontSize: '10px', // base font size for general text
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '10px', // specific font size for buttons
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
