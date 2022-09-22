import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Sidebar from '../components/Sidebar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { listItems } = useSelector((state) => state.lists);

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Crypto Coins
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setIsOpen(true)}
          >
            Mis Listas {listItems.length > 0 && `(${listItems.length})`}
          </Button>
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};

export default Header;
