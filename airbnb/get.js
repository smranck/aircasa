const fetch = require('node-fetch');
const states = require('./states.json');

const format = (
  listing,
  details = {
    listing: {
      description: 'loading',
      summary: 'loading',
      zipcode: '00000',
      state: listing.listing.public_address.split(', ')[1],
      cancellation_policy: 'loading',
    },
  },
) => ({
  num_guests: listing.listing.person_capacity,
  bedrooms: listing.listing.beds,
  bathrooms: listing.listing.bathrooms,
  name: listing.listing.name,
  description: details.listing.description,
  summary: details.listing.summary,
  neighborhood: listing.listing.neighborhood,
  street_address: listing.listing.public_address,
  lat: listing.listing.lat,
  lng: listing.listing.lng,
  zip_code: details.listing.zipcode,
  city: listing.listing.city,
  state: states[details.listing.state.toUpperCase()] || 'N/A',
  cancellation_policy: details.listing.cancellation_policy,
  nightly_price: listing.pricing_quote.rate.amount,
  pic_url: listing.listing.xl_picture_url || listing.listing.picture_url,
  rating: listing.listing.star_rating || 3,
  images: JSON.stringify(listing.listing.xl_picture_urls.slice(0, 3)),
});

const search = query =>
  fetch(encodeURI(`https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&locale=en-US&currency=USD&_format=for_search_results_with_minimal_pricing&_limit=10&_offset=0&fetch_facets=true&guests=1&location=${query}&min_num_pic_urls=1&sort=1`))
    .then(resp => resp.json())
    .then(resp => resp.search_results);

const details = id =>
  fetch(`https://api.airbnb.com/v2/listings/${id}?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3`).then(resp => resp.json());

module.exports = { format, search, details };
