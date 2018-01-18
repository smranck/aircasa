const { reservations, search } = require('../database');

const reserve = async (userId, listingId, start, end) => {
  const bookedDays = await reservations.check(listingId, start, end);
  if (bookedDays) {
    return {
      isBooked: false,
      reason: `Already booked during from ${new Date(bookedDays[0]).toLocaleDateString('en-US')} to ${new Date(bookedDays[1]).toLocaleDateString('en-US')}`,
    };
  }
  const reservation = await reservations.make(userId, listingId, start, end);
  return {
    isBooked: true,
    bookingId: reservation.id,
  };
};

const list = async (userId) => {
  const reservationsList = await reservations.getAllByUserId(userId);
  return Promise.all(reservationsList.map(reservation =>
    new Promise(async (resolve, reject) => {
      try {
        const listing = await search.byId(reservation.listing_id);
        return resolve({
          id: reservation.id,
          start: reservation.startDate,
          end: reservation.endDate,
          listing,
        });
      } catch (err) {
        return reject(err);
      }
    })));
};

const cancel = async (bookingId, userId) => {
  const reservation = await reservations.getById(bookingId);
  if (reservation.user_id !== userId) {
    return 401;
  }
  await reservations.cancel(bookingId);
  return 200;
};

module.exports = {
  reserve,
  list,
  cancel,
};
