import React, { useState } from 'react';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import ConnectSection from './components/ConnectSection';
import VideoPlayer from './components/VideoPlayer';
import QueueList from './components/QueueList';
 
import './App.css'; 


const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [queue, setQueue] = useState([]);



const handlePrioritize = (indexToPlay) => {
  setQueue((prevQueue) => {
    const selected = prevQueue[indexToPlay];
    const newQueue = prevQueue.filter((_, index) => index !== indexToPlay);
    setSelectedVideo(selected); // ✅ immediately play the selected video
    return newQueue;
  });
};



  // Remove a song from the queue by its index
const handleCancel = (indexToRemove) => {
  setQueue((prevQueue) =>
    prevQueue.filter((_, index) => index !== indexToRemove)
  );
};

  // Handle search and filter embeddable videos
  const handleSearch = async (term) => {
    const searchResponse = await youtube.get('/search', {
      params: {
        q: term + ' karaoke',
      },
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

    const detailsResponse = await youtube.get('/videos', {
      params: {
        part: 'status,snippet',
        id: videoIds,
      },
    });

    const embeddableVideos = detailsResponse.data.items.filter(
      (video) => video.status.embeddable
    );

    setVideos(embeddableVideos);

    // Only reset selectedVideo if it's not already selected
    if (!selectedVideo && embeddableVideos.length > 0) {
      setSelectedVideo(embeddableVideos[0]);
    }
  };

  // Handle video selection from search results
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Reserve a video to the queue
  const handleReserve = (video) => {
    setQueue((prevQueue) => [...prevQueue, video]);
  };

  // Play next song in queue when current video ends
  const handlePlayNext = () => {
    if (queue.length === 0) return;
    const [nextVideo, ...rest] = queue;
    setSelectedVideo(nextVideo);
    setQueue(rest);
  };

  return (
    <div className="App">
    <h1>🎤 Videoke Sing-Along App</h1>
  
    {/* Flex container for search results, video, and queue */}
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        marginTop: '20px',
      }}
    >
      {/* Search Results (left) */}
      <div style={{ flexBasis: '15%' }}>
      {/* Search Bar (fixed at top) */}
      <div
        style={{
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </div>


      {/* Scrollable video list */}
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <VideoList
          videos={videos}
          onVideoSelect={handleVideoSelect}
          onReserve={handleReserve}
        />        
      </div>
      <ConnectSection />
    </div>

  
      {/* Video Player (center) */}
      <div style={{ flex: 3, minWidth: '500px' }}>
        <VideoPlayer video={selectedVideo} onEnd={handlePlayNext} />
      </div>
  
      {/* Queue List (right) */}
      <div
        style={{
          flex: 1,
          maxHeight: '800px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          minWidth: '200px', 
        }}
      >
        <QueueList  
        queue={queue}
        onPlayNext={handlePlayNext}
        onCancel={handleCancel}
        onPrioritize={handlePrioritize}
        currentSong={selectedVideo}
        nextSong={queue[0]}
      />

      </div>
    </div>
  </div>
  
  
  

  
  
  );
};

export default App;
