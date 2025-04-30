import React from 'react';

const VideoPlayer = ({ video, onEnd }) => {
  if (!video) return null;

  const videoId = video.id.videoId || video.id;

  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ position: 'relative', width: '100%', height: '600px' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video Player"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
