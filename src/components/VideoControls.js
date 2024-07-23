// VideoControls.js
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const VideoControls = ({ isPlaying, onPlayPause, onNext, onPrevious }) => {
  return (
    <div className="video-controls">
      <IconButton onClick={onPrevious}>
        <SkipPreviousIcon />
      </IconButton>
      <IconButton onClick={onPlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton onClick={onNext}>
        <SkipNextIcon />
      </IconButton>
    </div>
  );
};

VideoControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default VideoControls;