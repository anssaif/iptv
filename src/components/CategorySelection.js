// src/components/CategorySelection.js
import React from 'react';
import { Box, Button } from '@mui/material';

const categories = ['LIVE', 'MOVIES', 'SERIES'];

const CategorySelection = ({ onSelectCategory }) => {
  return (
    <Box display="flex" justifyContent="center" marginTop="20px">
      {categories.map(category => (
        <Button
          key={category}
          variant="contained"
          onClick={() => onSelectCategory(category.toLowerCase())}
          style={{ margin: '0 10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategorySelection;