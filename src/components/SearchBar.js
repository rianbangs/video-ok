// src/components/SearchBar.js
import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Search karaoke song..."
          variant="outlined"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchBar;
