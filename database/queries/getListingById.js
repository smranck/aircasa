const connection = require('./../config.js');

const getListingById = id =>
  connection.queryAsync('SELECT * FROM listings WHERE id = ?', [id]).then(data => data[0]);

module.exports = getListingById;
