import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { initGA } from './hooks/useAnalytics'

// Initialize Google Analytics (if configured)
initGA();

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#0073e6",
    },
    secondary: {
      main: "#3399ff",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
