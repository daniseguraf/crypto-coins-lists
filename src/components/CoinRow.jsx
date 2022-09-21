import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  preListStart,
  removeItemFromPreListStart,
} from '../features/preListSlice';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import BtnFavorite from '../components/BtnFavorite';

const CoinRow = ({
  id,
  name,
  market_cap_rank,
  image,
  symbol,
  current_price,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  total_volume,
  market_cap,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();

  const { preListItems } = useSelector((state) => state.preList);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formatPercentages = (num) => {
    if (+num > 0) {
      return <span style={{ color: '#4eaf0a' }}>{num.toFixed(1)}%</span>;
    } else {
      return <span style={{ color: '#e15241' }}>{num.toFixed(1)}%</span>;
    }
  };

  const getCoinImgId = (img) => {
    return +img.split('images')[1].split('/')[1];
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      dispatch(preListStart({ id }));
    } else {
      dispatch(removeItemFromPreListStart({ preListItems, id }));
    }
  };

  useEffect(() => {
    const fav = preListItems.find((el) => el.id === id);
    setIsFavorite(fav && true);
  }, [preListItems, id]);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {/* Rank */}
      <TableCell align="right">
        <BtnFavorite isFavorite={isFavorite} onClick={handleFavorite} />
        {market_cap_rank}
      </TableCell>

      {/* Name & symbol */}
      <TableCell align="left">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <img src={image} alt={name} height={24} width={24} />
            <strong>{name}</strong>
          </Box>
          <Box component="span" sx={{ color: '#808A9D' }}>
            {symbol.toUpperCase()}
          </Box>
        </Box>
      </TableCell>

      {/* Price */}
      <TableCell align="right">{formatter.format(current_price)}</TableCell>

      {/* 1hr */}
      <TableCell align="right">
        {formatPercentages(price_change_percentage_1h_in_currency)}
      </TableCell>

      {/* 24r */}
      <TableCell align="right">
        {formatPercentages(price_change_percentage_24h_in_currency)}
      </TableCell>

      {/* 7d */}
      <TableCell align="right">
        {formatPercentages(price_change_percentage_7d_in_currency)}
      </TableCell>

      {/* 24h Volume */}
      <TableCell align="right">
        {formatter.format(total_volume).split('.')[0]}
      </TableCell>

      {/* Market Cap */}
      <TableCell align="right">
        {formatter.format(market_cap).split('.')[0]}
      </TableCell>

      {/* Last 7 days */}
      <TableCell align="right">
        <img
          loading="lazy"
          width="135"
          height="50"
          alt={name}
          src={`https://www.coingecko.com/coins/${getCoinImgId(
            image
          )}/sparkline`}
        />
      </TableCell>
    </TableRow>
  );
};

export default CoinRow;
