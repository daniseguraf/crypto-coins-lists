import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CoinRow from '../components/CoinRow';
import { Typography } from '@mui/material';

const Listpage = () => {
  const params = useParams();

  const { listItems } = useSelector((state) => state.lists);
  const currentList = listItems.find((el) => el.id === params.id);

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <Typography variant="h4" gutterBottom>
          {currentList.name}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="coins table">
            <TableHead>
              <TableRow className="cc-table-header">
                <TableCell align="right">#</TableCell>
                <TableCell align="left">Coin</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">1h</TableCell>
                <TableCell align="right">24h</TableCell>
                <TableCell align="right">7d</TableCell>
                <TableCell align="right">24h Volume</TableCell>
                <TableCell align="right">Mkt Cap</TableCell>
                <TableCell align="right">Last 7 Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentList.list &&
                currentList.list.map((row) => (
                  <CoinRow key={row.id} {...row} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Listpage;
