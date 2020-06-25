import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import "typeface-roboto";

import App from 'containers/App';

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
