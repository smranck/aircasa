const reservations = require('./queries/reservations');
const search = require('./queries/search');
const users = require('./queries/users');
const listings = require('./queries/listings');

module.exports = {
  reservations,
  search,
  users,
  listings,
};
