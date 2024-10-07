import React, { useState, useCallback, useContext, createContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

// Custom hook to use the snackbar.
export const useSnackBar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

// Provider component that wraps your app and makes snackbar methods available to any child component that calls the useSnackbar() hook.
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const SnackbarComponent = useCallback(() => (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={hideSnackbar}
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  ), [snackbar, hideSnackbar]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, SnackbarComponent }}>
      {children}
      <SnackbarComponent />
    </SnackbarContext.Provider>
  );
};