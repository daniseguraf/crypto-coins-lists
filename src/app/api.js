import axios from 'axios';

const path = `https://api.coingecko.com/api/v3/coins`;

// @desc get first 200 coins by market cap
export const getCoinsApi = async (pageNumber = '') => {
  const pages = 10;

  return await axios.get(
    `${path}/markets?vs_currency=usd&order=market_cap_desc&per_page=${pages}&page=${pageNumber}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );
};

// @desc get coin by ID
export const getCoinApi = async (coinId) => {
  return await axios.get(
    `${path}/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  );
};
