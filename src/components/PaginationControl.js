// src/components/PaginationControl.js

import React from 'react';
import { Box, Pagination } from '@mui/material';

const PaginationControl = ({ count, page, onPageChange }) => {
  return (
    <Box className="pagination-container">
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        color="primary"
      />
    </Box>
  );
};

export default PaginationControl;