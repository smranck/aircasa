const connection = require('./../config.js');

const getListingById = id => connection.queryAsync('SELECT * FROM listings WHERE id = ?', [id]);

module.exports = getListingById;
