// src/components/VideoPlayer.js

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import PropTypes from 'prop-types';

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported() && video) {
      const hls = new Hls();

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('Video and HLS.js are now bound together!');
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        const errorType = data.type;
        const errorDetails = data.details;
        const errorFatal = data.fatal;

        console.error('HLS error:', { errorType, errorDetails, errorFatal });

        switch (errorDetails) {
          case Hls.ErrorDetails.FRAG_LOAD_ERROR:
            console.error('Fragment load error');
            break;
          // Handle other errors here
          default:
            break;
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    }
  }, [url]);

  const handleError = (e) => {
    console.error('Error occurred while playing video:', e);
  };

  const handlePlay = () => {
    console.log('Video started playing');
  };

  const handlePause = () => {
    console.log('Video paused');
  };

  const handleEnded = () => {
    console.log('Video ended');
  };

  const handleProgress = (state) => {
    console.log('Video progress:', state);
  };

  return (
    <div className="player-wrapper">
      <video
        ref={videoRef}
        controls
        width="100%"
        height="100%"
        onError={handleError}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleProgress}
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default VideoPlayer;