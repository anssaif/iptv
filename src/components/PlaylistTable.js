// src/components/PlaylistTable.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PlaylistTable = ({ playlists, handleCheckboxChange, handleEdit, handleDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Playlist Name</TableCell>
            <TableCell>Playlist URL</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlists.map((playlist, index) => (
            <TableRow key={playlist.id}>
              <TableCell>
                <Checkbox
                  checked={playlist.isSelected}
                  onChange={() => handleCheckboxChange(index)}
                />
              </TableCell>
              <TableCell>{playlist.name}</TableCell>
              <TableCell>{playlist.url}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(playlist.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlaylistTable;