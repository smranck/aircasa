const connection = require('../config');

const byId = id =>
  connection.queryAsync('SELECT * FROM listings WHERE id = ?', [id]).then(data => data[0]);

const byCityState = async (city, state) => {
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

module.exports = {
  byId,
  byCityState,
};
