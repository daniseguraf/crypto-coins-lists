import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createListStart } from '../features/listsSlice';
import { preListReset } from '../features/preListSlice';

const SaveListForm = ({ open, onClose, onClick }) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { preListItems, loading, error } = useSelector(
    (state) => state.preList
  );

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSaveList = () => {
    dispatch(createListStart({ name, list: preListItems }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Guardar Nueva Lista</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="list-name"
          label="Nombre de Lista"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleChange}
        />
        <DialogContentText>
          <ul>
            {preListItems.map((el) => (
              <li>{el.name}</li>
            ))}
          </ul>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClick}>Cancel</Button>
        <Button onClick={handleSaveList}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveListForm;
