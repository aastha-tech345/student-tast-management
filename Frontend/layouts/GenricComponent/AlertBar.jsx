import { Alert, Snackbar } from '@mui/material';
import React from 'react';

function AlertBar({ snackbarOpen, alertMessage, alertSeverity, handleSnackbarClose }) {
  console.log('Snackbar Open:', snackbarOpen); // Optional for debugging

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000} // 6 seconds
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{zIndex:10000}}
    >
      <Alert onClose={handleSnackbarClose} variant="filled" severity={alertSeverity} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default AlertBar;
