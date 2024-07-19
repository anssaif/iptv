// src/components/Home.js

import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Home = ({ onSelectCategory }) => {
  return (
    <div style={{ display: 'block', margin: '20px' }}>
      <Typography variant="h4">Select Category</Typography>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button
          variant="contained"
          onClick={() => onSelectCategory('live')}
          style={{ margin: '0 10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          Live
        </Button>
        <Button
          variant="contained"
          onClick={() => onSelectCategory('movies')}
          style={{ margin: '0 10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          Movies
        </Button>
        <Button
          variant="contained"
          onClick={() => onSelectCategory('series')}
          style={{ margin: '0 10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          Series
        </Button>
      </Box>
    </div>
  );
};

export default Home;