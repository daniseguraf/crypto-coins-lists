import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteListStart } from '../features/listsSlice';
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
import Stack from '@mui/material/Stack';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drawerWidth = 350;

  const { listItems } = useSelector((state) => state.lists);

  const handleClick = (el) => {
    navigate(`/lists/${el}`);
    onClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteListStart({ id }));
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
          <Typography variant="h5">My Lists</Typography>
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
            <Alert severity="info">You don't have created lists yet.</Alert>
          ) : (
            listItems.map((el) => (
              <Card
                key={el.id}
                variant="outlined"
                sx={{ minWidth: 275, marginBottom: '1.25rem' }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <List>
                    {el.list.map((item) => (
                      <ListItem key={item.id} disablePadding>
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
                  <Stack direction="row" spacing={2}>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => handleDelete(el.id)}
                    >
                      Delete List
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleClick(el.id)}
                    >
                      See List
                    </Button>
                  </Stack>
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
