// src/components/ManagePlaylists.js

import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { addPlaylistToDB, getPlaylistsFromDB, deletePlaylistFromDB, updatePlaylistInDB, addChannelsToDB } from '../services/db';
import axios from 'axios';
import { parse } from 'iptv-playlist-parser';
import PlaylistForm from './PlaylistForm';
import PlaylistTable from './PlaylistTable';
import Notification from './Notification';

function ManagePlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchPlaylists = async () => {
      const dbPlaylists = await getPlaylistsFromDB();
      setPlaylists(dbPlaylists);

      const selected = dbPlaylists.find(playlist => playlist.isSelected);
      if (selected) {
        setSelectedPlaylist(selected);
      }
    };
    fetchPlaylists();
  }, []);

  const addPlaylist = async () => {
    const newPlaylist = { name: playlistName, url: playlistUrl, isSelected: false };
    await addPlaylistToDB(newPlaylist);
    const dbPlaylists = await getPlaylistsFromDB();
    setPlaylists(dbPlaylists);
    setPlaylistName('');
    setPlaylistUrl('');
  };

  const handleCheckboxChange = async (index) => {
    const selectedPlaylistId = playlists[index].id;

    const updatedPlaylists = playlists.map((playlist, i) => ({
      ...playlist,
      isSelected: i === index ? !playlist.isSelected : false,
    }));

    setPlaylists(updatedPlaylists);

    for (const playlist of updatedPlaylists) {
      await updatePlaylistInDB(playlist.id, playlist);
    }

    const selected = updatedPlaylists.find((playlist) => playlist.id === selectedPlaylistId && playlist.isSelected) || null;
    setSelectedPlaylist(selected);
  };

  const handleSave = async () => {
    if (!selectedPlaylist || !selectedPlaylist.url) return;

    setIsLoading(true);

    try {
      const response = await axios.get(selectedPlaylist.url);
      const data = response.data;
      const result = parse(data);

      const channels = categorizeChannels(result.items);

      const allChannels = [
        ...channels.live.map(channel => ({ ...channel, group: 'live' })),
        ...channels.series.map(channel => ({ ...channel, group: 'series' })),
        ...channels.movies.map(channel => ({ ...channel, group: 'movies' })),
      ];

      const { totalChannels, uploadedChannelsCount } = await addChannelsToDB(allChannels);

      // Log the totals to the console
      console.log(`Total channels fetched: ${totalChannels}`);
      console.log(`Total channels uploaded: ${uploadedChannelsCount}`);
      console.log(`Live channels: ${channels.live.length}`);
      console.log(`Series: ${channels.series.length}`);
      console.log(`Movies: ${channels.movies.length}`);

      if (totalChannels === uploadedChannelsCount) {
        setNotification({
          open: true,
          message: `Loaded ${channels.live.length} live channels, ${channels.series.length} series, ${channels.movies.length} movies. Total fetched: ${totalChannels}. Total uploaded: ${uploadedChannelsCount}.`,
          severity: 'success',
        });
      } else {
        setNotification({
          open: true,
          message: `Error: Only ${uploadedChannelsCount} out of ${totalChannels} channels were uploaded.`,
          severity: 'error',
        });
      }

      await updatePlaylistInDB(selectedPlaylist.id, { ...selectedPlaylist, isSelected: true });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error fetching playlist',
        severity: 'error',
      });
      console.error('Error fetching playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categorizeChannels = (channels) => {
    const live = [];
    const series = [];
    const movies = [];
    channels.forEach(channel => {
      if (channel.url) {
        if (channel.url.includes('series')) {
          series.push(channel);
        } else if (channel.url.includes('movie')) {
          movies.push(channel);
        } else {
          live.push(channel);
        }
      }
    });
    return { live, series, movies };
  };

  const handleDelete = async (id) => {
    await deletePlaylistFromDB(id);
    const dbPlaylists = await getPlaylistsFromDB();
    setPlaylists(dbPlaylists);
  };

  const handleEdit = (index) => {
    const playlist = playlists[index];
    setPlaylistName(playlist.name);
    setPlaylistUrl(playlist.url);
    setSelectedPlaylist(playlist);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      <PlaylistForm
        playlistName={playlistName}
        playlistUrl={playlistUrl}
        setPlaylistName={setPlaylistName}
        setPlaylistUrl={setPlaylistUrl}
        addPlaylist={addPlaylist}
        handleSave={handleSave}
      />
      {isLoading && <CircularProgress />}
      <PlaylistTable
        playlists={playlists}
        handleCheckboxChange={handleCheckboxChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Notification
        notification={notification}
        handleCloseNotification={handleCloseNotification}
      />
    </div>
  );
}

export default ManagePlaylists;