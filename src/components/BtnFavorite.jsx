import React from 'react';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const BtnFavorite = ({ isFavorite, onClick }) => {
  return (
    <IconButton aria-label="add favorite" onClick={onClick}>
      {isFavorite ? <StarIcon sx={{ color: '#edcd18' }} /> : <StarBorderIcon />}
    </IconButton>
  );
};

export default BtnFavorite;
