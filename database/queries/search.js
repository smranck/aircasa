const connection = require('../config');
const { parse } = require('./listings');

const byId = id =>
  connection.queryAsync('SELECT * FROM listings WHERE id = ?', [id]).then(data => parse(data[0]));

const byCityState = async (city, state) => {
  const listingsInCity = await connection
    .queryAsync('SELECT * FROM listings WHERE city = ? AND state = ?', [city, state])
    .then(data => data.map(listing => parse(listing)));
  const listingsInState = await connection
    .queryAsync('SELECT * FROM listings WHERE city != ? AND state = ?', [city, state])
    .then(data => data.map(listing => parse(listing)));
  return [...listingsInCity, ...listingsInState];
};

const check = async (city, state) => {
  const query = `${city.toLowerCase()}, ${state.toLowerCase()}`;
  const isIn = await connection
    .queryAsync('SELECT * FROM searches WHERE query = ?', [query])
    .then(data => data[0]);
  if (isIn) {
    return true;
  }
  return false;
};

module.exports = {
  byId,
  byCityState,
  check,
};
