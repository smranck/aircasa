const fetch = require('node-fetch');

const connection = require('../config');
const listings = require('../queries/listings');

const format = async (listing) => {
  const details = await fetch(`https://api.airbnb.com/v2/listings/${
    listing.listing.id
  }?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3`).then(resp => resp.json());
  return {
    num_guests: listing.listing.person_capacity,
    bedrooms: listing.listing.beds,
    bathrooms: listing.listing.bathrooms,
    name: listing.listing.name,
    description: details.listing.description,
    summary: details.listing.summary,
    neighborhood: listing.listing.neighborhood,
    street_address: details.listing.address,
    lat: listing.listing.lat,
    lng: listing.listing.lng,
    zip_code: details.listing.zipcode,
    city: listing.listing.city,
    state: details.listing.state,
    cancellation_policy: details.listing.cancellation_policy,
    nightly_price: details.listing.price,
    pic_url: listing.listing.picture_url,
    rating: listing.listing.star_rating || 3,
  };
};

const insertData = async (location) => {
  const users = await connection.queryAsync('SELECT * FROM users');

  const data = await fetch(encodeURI(`https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&locale=en-US&currency=USD&_format=for_search_results_with_minimal_pricing&_limit=20&_offset=0&fetch_facets=true&guests=1&location=${location}&min_num_pic_urls=1&sort=1`)).then(resp => resp.json());

  return Promise.all(data.search_results.map(async (listing) => {
    const formattedListing = await format(listing);
    const user = users[Math.floor(Math.random() * users.length)];
    await listings.post(formattedListing, user.id);
    return console.log(`Added listing "${formattedListing.name}", posted by "${user.name}"`);
  }));
};

module.exports = insertData;
