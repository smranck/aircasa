const connection = require('../config');
const listings = require('../queries/listings');

const lakeTahoeJSON = require('./lakeTahoe.json');
const losAngelesJSON = require('./losAngeles.json');
const newYorkCityJSON = require('./newYorkCity.json');

let lakeTahoe = [];
let losAngeles = [];
let newYorkCity = [];

let users = [];

const format = (listing, state) => ({
  num_guests: listing.listing.person_capacity,
  bedrooms: listing.listing.beds,
  bathrooms: listing.listing.bathrooms,
  name: listing.listing.name,
  description: '',
  summary: '',
  neighborhood: listing.listing.neighborhood,
  street_address: '123 Main Street',
  lat: listing.listing.lat,
  lng: listing.listing.lng,
  zip_code: '00000',
  city: listing.listing.city,
  state,
  cancellation_policy: 'Moderate',
  nightly_price: Number(Math.random() * 100).toFixed(2),
  pic_url: listing.listing.picture_url,
  rating: listing.listing.star_rating || 3,
});

const insertData = async () => {
  users = await connection.queryAsync('SELECT * FROM users');

  lakeTahoe = lakeTahoeJSON.search_results.map(listing => format(listing, 'Neveda'));
  losAngeles = losAngelesJSON.search_results.map(listing => format(listing, 'California'));
  newYorkCity = newYorkCityJSON.search_results.map(listing => format(listing, 'New York'));

  const cities = [lakeTahoe, losAngeles, newYorkCity];

  await Promise.all(cities.map(city =>
    Promise.all(city.map(listing =>
      listings.post(listing, users[Math.floor(Math.random() * users.length)].id)))));
};

module.exports = insertData;
