module.exports = {
  getAllListings: require('./queries/getAllListings.js'),
  user: require('./queries/getBooking.js'),
  getListingsByCity: require('./queries/getListingsByCity.js'),
  checkAvailability: require('./queries/checkAvailability.js'),
  saveReservation: require('./queries/saveReservation.js'),
  getListingById: require('./queries/getListingById.js'),
};
