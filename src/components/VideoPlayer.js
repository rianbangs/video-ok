import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ video, onEnd }) => {
  const [playerHeight, setPlayerHeight] = useState('500');

  useEffect(() => {
    console.log('useEffect triggered');
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
  
      console.log(`Screen dimensions: ${screenWidth}x${screenHeight}`);
  
      if (screenWidth >= 1366 && screenWidth <= 1920 && screenHeight >= 900) {
        setPlayerHeight('900');
      } else {
        setPlayerHeight('500');
        
      }
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
    console.log('Event listener added');
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  if (!video) return null;

  const videoId = video.id.videoId || video.id;

  const opts = {
    height: playerHeight,
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
      <h3>{video.snippet.title}{playerHeight}</h3>
      <YouTube videoId={videoId} opts={opts} onEnd={handleEnd} />
    </div>
  );
};

export default VideoPlayer;
