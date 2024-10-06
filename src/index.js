import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#19346b',
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h6' },
          style: {
            fontWeight: 'bold',
            // color: '#19346b',
          },
        },
      ],
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
