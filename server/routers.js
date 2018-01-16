const express = require('express');
const router = express.Router();
const {
  getAllListings,
  user,
  getListingsByCity,
  checkAvailability,
  saveReservation,
  getListingById,
} = require('../database');
const googleAPI = require('./../api/gMapClient.js');

router.post('/api/listings/search', async (req, res) => {
  try {
    const listings = await getListingsByCity(req.body.city, req.body.state);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json(err.stack);
  }
});

router.post('*/bookings-james', (req, res) => {
  let dates = req.body.data;
  let listingId = req.body.listing;
  let userId = req.body.user;
  checkAvailability(listingId, dates, (results) => {
    results
      ? saveReservation(listingId, userId, dates, (results) =>
          res.send('success'),
        )
      : res.send('failure');
  });
});

router.get('*/listings-ted', (req, res) =>
  getAllListings((results) => {
    res.json(results);
  }),
);

router.get('*/listings-iris', (req, res) => {
  var finalResults = {};
  getListingById(req.query.listingId)
    .then((listingObj) => {
      finalResults.listing = listingObj[0];
      return googleAPI.getAddress(JSON.stringify(listingObj));
    })
    .then((addr) => {
      finalResults.address = addr;
      return googleAPI.getLatLong(addr, (data) => {
        finalResults.latLong = data.json.results[0].geometry.location;
        res.json(finalResults);
      });
    })
    .catch((err) => res.json(err));
});

router.get('/usercomponent-v', (req, res) =>
  user.getAllBooking(function(err, results) {
    if (err) {
      return res.statusCode(500);
    } else {
      return res.json(results);
    }
  }),
);
router.post('/usercomponent-v', (req, res) =>
  user.cancelReservation(function(err, results) {
    //console.log(req.body.id)
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  }, req.body.id),
);

module.exports = router;
