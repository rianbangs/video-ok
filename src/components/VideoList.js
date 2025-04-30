// src/components/VideoList.js
import React from 'react';

const VideoList = ({ videos, onVideoSelect, onReserve }) => {
  return (
    <ul>
      {videos.map((video) => (
        <li key={video.id.videoId}>
          <img
            src={video.snippet.thumbnails.default.url}
            alt={video.snippet.title}
            onClick={() => onVideoSelect(video)}
            style={{ cursor: 'pointer' }}
          />
          <p>{video.snippet.title}</p>
          <button onClick={() => onReserve(video)}>🎵 Reserve</button>
        </li>
      ))}
    </ul>
  );
};

export default VideoList;
