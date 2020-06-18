import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import App from './App';
import "typeface-roboto";

const theme = createMuiTheme();

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <App />
      </React.Fragment>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
