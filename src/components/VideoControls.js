// Page Reference: VideoControls.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const VideoControls = ({ onPlay, onPause, onNext, onPrevious }) => {
  return (
    <div className="video-controls">
      <Button onClick={onPlay}>Play</Button>
      <Button onClick={onPause}>Pause</Button>
      <Button onClick={onPrevious}>Previous</Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};

VideoControls.propTypes = {
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default VideoControls;