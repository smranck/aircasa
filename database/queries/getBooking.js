const connection = require('../config.js');

const getAllReservations = userId =>
  connection.queryAsync(
    'SELECT bookings.* FROM bookings RIGHT OUTER JOIN listings ON bookings.listing_id = listings.id WHERE bookings.user_id = ?',
    [userId],
  );

const getReservation = bookingId =>
  connection.queryAsync('SELECT * FROM bookings WHERE id = ?', [bookingId]).then(data => data[0]);

const getReservationsForListing = listingId =>
  connection.queryAsync('SELECT * FROM bookings WHERE listing_id = ?', [listingId]);

const cancelReservation = bookingId =>
  connection.queryAsync('DELETE FROM bookings WHERE id = ?', [bookingId]);

const makeReservation = (userId, listingId, startDate, endDate) =>
  connection
    .queryAsync(
      'INSERT INTO bookings (user_id, listing_id, startDate, endDate) VALUES (?, ?, ?, ?)',
      [
        userId,
        listingId,
        new Date(startDate).toLocaleDateString(),
        new Date(endDate).toLocaleDateString(),
      ],
    )
    .then(data => connection.queryAsync('SELECT * FROM bookings WHERE id = ?', [data.insertId]))
    .then(data => data[0]);

const checkIfBooked = async (listingId, start, end) => {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const currentBookings = await getReservationsForListing(listingId);
  for (let i = 0; i < currentBookings.length; i += 1) {
    const bookedStart = new Date(currentBookings[i].startDate).getTime();
    const bookedEnd = new Date(currentBookings[i].endDate).getTime();
    if (startDate < bookedEnd && startDate > bookedStart) {
      return [bookedStart, bookedEnd];
    }
    if (endDate > bookedStart && endDate < bookedEnd) {
      return [bookedStart, bookedEnd];
    }
    if (startDate < bookedStart && endDate > bookedEnd) {
      return [bookedStart, bookedEnd];
    }
  }
  return false;
};

module.exports = {
  getAllReservations,
  cancelReservation,
  makeReservation,
  getReservationsForListing,
  checkIfBooked,
  getReservation,
};
