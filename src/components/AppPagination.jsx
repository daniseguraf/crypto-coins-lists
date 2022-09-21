import React from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const AppPagination = ({ onChange }) => {
  const params = useParams();

  return (
    <Pagination
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem',
        margin: '2rem 0',
      }}
      color="primary"
      count={20}
      page={+params.pageNumber || 1}
      onChange={onChange}
    />
  );
};

export default AppPagination;
