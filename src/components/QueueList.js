import React from 'react';

const QueueList = ({ queue, onCancel, onPrioritize }) => {
  return (
    <div>
      <h2>🎶 Song Queue</h2>
      {queue.length === 0 ? (
        <p>No songs reserved yet.</p>
      ) : (
        <ol>
          {queue.map((video, index) => (
            <li
                key={video.id.videoId || video.id}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                    gap: '10px',
                }}
                >
                <span style={{ flex: 1 }}>{index + 1}. {video.snippet.title}</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={() => onPrioritize(index)}>▶️ Play Now</button>
                    <button onClick={() => onCancel(index)}>❌ Cancel</button>
                </div>
            </li>

          ))}
        </ol>
      )}
    </div>
  );
};

export default QueueList;
