// src/components/SearchBar.js

import React from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      label="Search Channels"
      value={searchTerm}
      onChange={onSearchChange}
      variant="outlined"
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        )
      }}
    />
  );
};

export default SearchBar;