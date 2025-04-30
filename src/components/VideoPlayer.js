import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ video, onEnd }) => {
  if (!video) return null;

  const videoId = video.id.videoId || video.id;

  const opts = {
    height: '900', // Increased height
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleEnd = () => {
    onEnd(); // Trigger the next video
  };

  return (
    <div>
      <h3>{video.snippet.title}</h3>
      <YouTube videoId={videoId} opts={opts} onEnd={handleEnd} />
    </div>
  );
};

export default VideoPlayer;
