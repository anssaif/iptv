// VideoPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import PropTypes from 'prop-types';
import VideoControls from './VideoControls';

const VideoPlayer = ({ url, onNext, onPrevious }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-wrapper">
      <video
        ref={videoRef}
        controls
        width="100%"
        height="100%"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <VideoControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default VideoPlayer;