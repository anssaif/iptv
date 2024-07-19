// src/components/ProgressBar.js

import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const ProgressBar = ({ progress }) => {
  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default ProgressBar;