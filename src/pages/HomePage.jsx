import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoinsStart } from '../features/coinsSlice';

import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CoinRow from '../components/CoinRow';
import AppPagination from '../components/AppPagination';

const Homepage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const pageNumber = params.pageNumber || 1;

  const { loading, error, coinList } = useSelector((state) => state.coins);

  const handlePagination = (e) => {
    dispatch(getCoinsStart({ pageNumber: +e.target.textContent, navigate }));
  };

  useEffect(() => {
    dispatch(getCoinsStart({ pageNumber }));
  }, [dispatch, pageNumber]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '3rem' }}>
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
            {coinList.map((row) => (
              <CoinRow key={row.id} {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AppPagination onChange={handlePagination} />
    </Container>
  );
};

export default Homepage;
