import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createListStart } from '../features/listsSlice';

const schema = yup
  .object({
    listName: yup
      .string()
      .required('List Name is required')
      .min(3, 'Minimum 3 characters')
      .max(8, 'Maximun 8 characters'),
  })
  .required();

const defaultValues = {
  listName: '',
};

const SaveListForm = ({ open, onClose, onClick }) => {
  const dispatch = useDispatch();
  const { preListItems } = useSelector((state) => state.preList);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    dispatch(createListStart({ name: data.listName, list: preListItems }));
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  useEffect(() => {}, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New List</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            error={!!errors.listName}
            helperText={errors.listName?.message}
            autoFocus
            margin="dense"
            id="list-name"
            label="List Name"
            type="text"
            fullWidth
            {...register('listName')}
          />

          <ul>
            {preListItems.map((el) => (
              <li key={el.id}>{el.name}</li>
            ))}
          </ul>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SaveListForm;
