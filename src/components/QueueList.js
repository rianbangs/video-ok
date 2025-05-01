import React, { useEffect, useRef, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Divider,
  Box,
  Paper,
} from '@mui/material';


const QueueList = ({ queue, onCancel, onPrioritize, currentSong, nextSong }) => {
  const lastItemRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const previousQueueLength = useRef(queue.length);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (queue.length > previousQueueLength.current) {
      // A new entry has been added
      const newIndex = queue.length - 1;
      setHighlightedIndex(newIndex);

      if (lastItemRef.current) {
        lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const timer = setTimeout(() => {
        setHighlightedIndex(null);
      }, 4000);

      return () => clearTimeout(timer);
    }

    // Update the previous queue length
    previousQueueLength.current = queue.length;
  }, [queue]);

  // Blinking effect for "Now Playing"
  useEffect(() => {
    if (currentSong) {
      const blinkInterval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 500); // Toggle every 500ms

      return () => clearInterval(blinkInterval); // Cleanup on unmount
    }
  }, [currentSong]);

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          🎶 Song Queue
        </Typography>

        {/* Now Playing Highlighted Box */}
        {currentSong && (
          <Paper
            elevation={2}
            sx={{
              backgroundColor: isBlinking ? 'lightgreen' : 'white', // Toggle background color
              padding: 1.5,
              mb: 1,
              borderRadius: 1,
              transition: 'background-color 0.5s ease', // Smooth transition
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Now Playing:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {currentSong.snippet.title}
            </Typography>
          </Paper>
        )}

        {/* Next Song Highlighted Box */}
        {nextSong && (
          <Paper
            elevation={1}
            sx={{
              backgroundColor: '#e3f2fd',
              padding: 1.5,
              mb: 2,
              borderRadius: 1,
              overflow: 'hidden', // Ensure the marquee effect stays within bounds
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Next Song in Queue:
            </Typography>
            <Box className="marquee">
              <Typography variant="body2" fontWeight="medium">
                {nextSong.snippet.title}
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'antiquewhite',
          borderRadius: 2,
          maxHeight: 400,
          overflowY: 'auto',
        }}
      >
        {queue.length === 0 ? (
          <Typography variant="body2">No songs reserved yet.</Typography>
        ) : (
          <List>
            {queue.map((video, index) => (
              <React.Fragment key={video.id.videoId || video.id}>
                <ListItem
                  ref={index === queue.length - 1 ? lastItemRef : null}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1,
                    backgroundColor:
                      index === highlightedIndex
                        ? '#4caf50' // Green highlight for newly added entry
                        : index % 2 === 0
                        ? '#f7f7f7'
                        : 'transparent',
                    borderRadius: 1,
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <ListItemText
                    primary={`${index + 1}. ${video.snippet.title}`}
                    sx={{ flex: 1 }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onPrioritize(index)}
                    >
                      ▶️ Play Now
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => onCancel(index)}
                    >
                      ❌ Cancel
                    </Button>
                  </div>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

export default QueueList;