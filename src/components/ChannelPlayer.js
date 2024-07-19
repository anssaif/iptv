// src/components/ChannelPlayer.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import { getChannelsFromDB } from '../services/db';
import SearchBar from './SearchBar';
import ChannelList from './ChannelList';
import PaginationControl from './PaginationControl';
import './ChannelPlayer.css';

const ITEMS_PER_PAGE = 100;

const ChannelPlayer = ({ category }) => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchChannels = async () => {
      const channelsFromDB = await getChannelsFromDB();
      const filteredByCategory = channelsFromDB.filter(channel => channel.group === category);
      console.log(`Channels fetched for category "${category}":`, filteredByCategory); // <-- Log fetched channels
      setChannels(filteredByCategory);
      setFilteredChannels(filteredByCategory.slice(0, ITEMS_PER_PAGE));
      if (filteredByCategory.length > 0) {
        setUrl(filteredByCategory[0].url);
      }
      setLoading(false);
    };
    fetchChannels();
  }, [category]); // <-- Category is used to determine which channels to fetch

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = channels.filter(channel =>
      channel.name.toLowerCase().includes(term)
    );
    setFilteredChannels(filtered.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
  };

  const handleNext = () => {
    const newIndex = (currentChannelIndex + 1) % filteredChannels.length;
    changeChannel(newIndex);
  };

  const handlePrevious = () => {
    const newIndex = (currentChannelIndex - 1 + filteredChannels.length) % filteredChannels.length;
    changeChannel(newIndex);
  };

  const handleChannelClick = (index) => {
    changeChannel(index);
  };

  const changeChannel = (index) => {
    setCurrentChannelIndex(index);
    setLoading(true);
    setTimeout(() => {
      setUrl(filteredChannels[index].url);
      setLoading(false);
      console.log(`Selected URL: ${filteredChannels[index].url}, Group: ${filteredChannels[index].group}`); // <-- Log selected channel URL and group
    }, 500);
  };

  const handlePageChange = (event, value) => {
    const startIndex = (value - 1) * ITEMS_PER_PAGE;
    const endIndex = value * ITEMS_PER_PAGE;
    setFilteredChannels(channels.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  return (
    <Box display="flex" height="100vh">
      <Box className="channel-list" width="300px" borderRight="1px solid #ddd">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <ChannelList channels={filteredChannels} onChannelClick={handleChannelClick} />
        <PaginationControl
          count={Math.ceil(channels.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
      <Box flex={1} padding="20px" display="flex" flexDirection="column">
        <Typography variant="h4" gutterBottom>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Player` : 'Channel Player'}</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <VideoPlayer url={url} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelPlayer;