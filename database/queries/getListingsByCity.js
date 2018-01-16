const connection = require('./../config.js');

const getListingsByCity = async (city, state) => {
  const listingsInCity = await connection.queryAsync(
    'SELECT * FROM listings WHERE city = ? AND state = ?',
    [city, state],
  );
  const listingsInState = await connection.queryAsync(
    'SELECT * FROM listings WHERE city != ? AND state = ?',
    [city, state],
  );
  return [...listingsInCity, ...listingsInState];
};

module.exports = getListingsByCity;
