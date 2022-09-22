import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const drawerWidth = 350;

  const { listItems } = useSelector((state) => state.lists);

  const handleClick = (el) => {
    navigate(`/listas/${el}`);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        padding: '1rem',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ padding: '1.5rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '0.5rem',
          }}
        >
          <Typography variant="h5">Mis Listas</Typography>
          <IconButton aria-label="close" color="primary" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: '1rem 0',
          }}
        >
          {listItems.length === 0 ? (
            <Alert severity="info">No tienes listas creadas.</Alert>
          ) : (
            listItems.map((el) => (
              <Card
                variant="outlined"
                sx={{ minWidth: 275, marginBottom: '1.25rem' }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <List>
                    {el.list.map((item) => (
                      <ListItem disablePadding>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {item.name}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleClick(el.id)}>
                    Ver Más
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
