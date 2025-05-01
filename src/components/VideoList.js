import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Divider,
  Box,
} from '@mui/material';

const VideoList = ({ videos, onVideoSelect, onReserve }) => {
  return (
    <Box sx={{ backgroundColor: 'antiquewhite', borderRadius: 2, p: 1 }}>
      <List>
        {videos.map((video, index) => (
          <React.Fragment key={video.id.videoId || index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={video.snippet.title}
                  src={video.snippet.thumbnails.default.url}
                  onClick={() => onVideoSelect(video)}
                  sx={{ cursor: 'pointer' }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={video.snippet.title}
                secondary={
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onReserve(video)}
                    sx={{ marginTop: 1 }}
                  >
                    🎵 Reserve
                  </Button>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default VideoList;
