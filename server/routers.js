const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const passport = require('./userAuth/passport');
const auth = require('./userAuth/auth');
const googleAPI = require('../api/gMapClient.js');
const {
  getListingsByCity,
  getListingById,
  userHelper,
  booking,
  makeListing,
} = require('../database');

const router = express.Router();
const reactRoute = (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));

router.use(cookieParser());
router.use(session({ secret: 'airbnb-casa', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', async (req, res) => {
  try {
    if (await userHelper.getUser(req.body.username)) {
      return res.sendStatus(409);
    }
    await auth.addUser(req.body.username, req.body.password, req.body.phoneNumber, req.body.email);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) =>
  res.status(200).json({ userId: req.session.passport.user }));

router.get('/api/listings/details/:id', async (req, res) => {
  try {
    const listing = await getListingById(req.params.id);
    return res.status(200).json(listing);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/listings/search', async (req, res) => {
  try {
    const listings = await getListingsByCity(req.body.city, req.body.state);
    return res.status(200).json(listings);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/bookings/reserve', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const bookedDays = await booking.checkIfBooked(
      req.body.listingId,
      req.body.start,
      req.body.end,
    );
    if (bookedDays) {
      return res.status(200).json({
        isBooked: false,
        reason: `Already booked during from ${new Date(bookedDays[0]).toLocaleDateString('en-US')} to ${new Date(bookedDays[1]).toLocaleDateString('en-US')}`,
      });
    }
    const reservation = await booking.makeReservation(
      req.session.passport.user,
      req.body.listingId,
      req.body.start,
      req.body.end,
    );
    return res.status(200).json({
      isBooked: true,
      bookingId: reservation.id,
    });
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.get('/api/bookings/list', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const reservations = await booking.getAllReservations(req.session.passport.user);
    const reservationsWithListings = await Promise.all(reservations.map(reservation =>
      new Promise(async (resolve, reject) => {
        try {
          const listing = await getListingById(reservation.listing_id);
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
    return res.status(200).json(reservationsWithListings);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/bookings/cancel', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const reservation = await booking.getReservation(req.body.bookingId);
    if (reservation.user_id !== req.session.passport.user) {
      return res.sendStatus(401);
    }
    await booking.cancelReservation(req.body.bookingId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.get('/api/listings', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const listings = await makeListing.getListings(req.session.passport.user);
    return res.status(200).json(listings);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/listings/host', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const listing = await makeListing.postListing(req.body, req.session.passport.user);
    return res.status(200).json(listing);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.post('/api/listings/cancel', async (req, res) => {
  try {
    if (!req.session.passport) {
      return res.sendStatus(401);
    }
    const listing = await getListingById(req.body.listingId);
    if (listing.host_id !== req.session.passport.user) {
      return res.sendStatus(401);
    }
    await makeListing.removeListing(req.body.listingId);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err.stack);
  }
});

router.get('/login', reactRoute);
router.get('/signup', reactRoute);
router.get('/listings*', reactRoute);
router.get('/bookings*', reactRoute);

module.exports = router;
