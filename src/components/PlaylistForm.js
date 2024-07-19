// src/components/PlaylistForm.js

import React from 'react';
import { TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const PlaylistForm = ({ playlistName, playlistUrl, setPlaylistName, setPlaylistUrl, addPlaylist, handleSave }) => {
  return (
    <div style={{ display: 'flex', margin: '20px' }}>
      <TextField
        label="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <TextField
        label="Playlist URL"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <IconButton color="primary" onClick={addPlaylist}>
        <AddIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleSave}>
        <SaveIcon />
      </IconButton>
    </div>
  );
};

export default PlaylistForm;