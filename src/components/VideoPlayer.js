// src/components/VideoPlayer.jsthunder
import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ video, onEnd }) => {
  if (!video) return null;

  const videoId = video.id.videoId || video.id; // fallback if passed directly

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleEnd = () => {
    onEnd(); // Call the function from App when video ends
  };

  return (
    <div>
      <h3>{video.snippet.title}</h3>
      <YouTube videoId={videoId} opts={opts} onEnd={handleEnd} />
    </div>
  );
};

export default VideoPlayer;
