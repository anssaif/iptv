// src/services/db.js
import { openDB } from 'idb';

const DB_NAME = 'iptvDatabase';
const DB_VERSION = 1;
const PLAYLIST_STORE = 'playlists';
const CHANNEL_STORE = 'channels';
const CHUNK_SIZE = 250;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(PLAYLIST_STORE)) {
      db.createObjectStore(PLAYLIST_STORE, { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains(CHANNEL_STORE)) {
      db.createObjectStore(CHANNEL_STORE, { keyPath: 'id', autoIncrement: true });
    }
  }
});

export const getPlaylistsFromDB = async () => {
  const db = await dbPromise;
  return await db.getAll(PLAYLIST_STORE);
};

export const addPlaylistToDB = async (playlist) => {
  const db = await dbPromise;
  const newPlaylist = { ...playlist, id: Date.now().toString(), timestamp: new Date().toISOString() };
  await db.put(PLAYLIST_STORE, newPlaylist);
  return newPlaylist.id;
};

export const deletePlaylistFromDB = async (id) => {
  const db = await dbPromise;
  await db.delete(PLAYLIST_STORE, id);
};

export const updatePlaylistInDB = async (id, updatedPlaylist) => {
  const db = await dbPromise;
  await db.put(PLAYLIST_STORE, { ...updatedPlaylist, id });
};

export const addChannelsToDB = async (channels) => {
  const db = await dbPromise;
  await clearChannelsFromDB(); // Clear existing channels before adding new ones

  const totalChannels = channels.length;
  let uploadedChannelsCount = 0;

  const chunkedChannels = [];
  for (let i = 0; i < channels.length; i += CHUNK_SIZE) {
    chunkedChannels.push(channels.slice(i, i + CHUNK_SIZE));
  }

  for (const chunk of chunkedChannels) {
    const tx = db.transaction(CHANNEL_STORE, 'readwrite');
    try {
      for (const channel of chunk) {
        await tx.store.put(channel);
        uploadedChannelsCount++;
      }
      await tx.done;
    } catch (error) {
      console.error('Error adding channels to DB:', error);
    }
  }

  return { totalChannels, uploadedChannelsCount };
};

export const getChannelsFromDB = async () => {
  const db = await dbPromise;
  const channels = [];
  let cursor = await db.transaction(CHANNEL_STORE).store.openCursor();
  while (cursor) {
    channels.push(cursor.value);
    cursor = await cursor.continue();
  }
  return channels;
};

export const clearChannelsFromDB = async () => {
  const db = await dbPromise;
  await db.clear(CHANNEL_STORE);
};