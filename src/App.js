import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import AppRoutes from './routes/Routes';
import { SnackbarProvider } from './hooks/useSnackBar';

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <ResponsiveDrawer />
          <Box component="main" sx={{ flexGrow: 1, pl: 3, pr: 3, width: { sm: `calc(100% - ${240}px)` } }}>
            {/* Toolbar here just for spacing, pushes content below app bar */}
            <Toolbar />
            <AppRoutes />
          </Box>
        </Box>
      </Router>
    </SnackbarProvider>
  );
}

export default App;