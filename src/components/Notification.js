// src/components/Notification.js

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ notification, handleCloseNotification }) => {
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={handleCloseNotification}
    >
      <Alert onClose={handleCloseNotification} severity={notification.severity}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;