import React from 'react';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

interface ToastProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  severity: "error" | "warning" | "info" | "success";
  text: string;
};

export const Toast: React.FunctionComponent<ToastProps> = (props) => {
  const { open, setOpen, severity, text } = props;
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}

export default Toast;
