import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { LinkedIn, Facebook } from '@mui/icons-material'; // Import Material Icons
import indeedLogo from '../assets/indeed_logo.jpg'; // Import the image from the assets folder

const ConnectSection = () => {
  return (
    <Box
      sx={{
        marginTop: 3,
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6">📬 Connect with me</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Feel free to reach out through any of the platforms below:
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        {/* LinkedIn Badge Icon */}
        <IconButton
          color="primary"
          href="https://www.linkedin.com/in/joseph-rian-cirunay-70b0312b4"
          target="_blank"
          rel="noopener"
        >
          <LinkedIn fontSize="large" />
        </IconButton>

        {/* Facebook Badge Icon */}
        <IconButton
          color="primary"
          href="https://www.facebook.com/josephrian.cirunay.9/"
          target="_blank"
          rel="noopener"
        >
          <Facebook fontSize="large" />
        </IconButton>

        {/* Indeed Badge Icon with the actual Indeed logo */}
        <IconButton
          color="secondary"
          href="https://profile.indeed.com/?hl=en_US&co=US&from=gnav-jobsearch--indeedmobile"
          target="_blank"
          rel="noopener"
        >
          <img
            src={indeedLogo}
            alt="Indeed Logo"
            style={{ width: '90px', height: '90px' }} // Adjust size as needed
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ConnectSection;
