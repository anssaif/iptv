// src/components/ChannelList.js

import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';

const ChannelList = ({ channels, onChannelClick }) => {
  return (
    <Box className="channel-list-content">
      <List>
        {channels.map((channel, index) => (
          <ListItem button key={index} onClick={() => onChannelClick(index)}>
            <ListItemText primary={channel.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChannelList;