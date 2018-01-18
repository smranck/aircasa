const { getLatLong } = require('../api/gMapClient');
const { listings, search } = require('../database');

const get = userId => listings.getAllByUserId(userId);

const host = async (listing, userId) => {
  const latLong = await getLatLong(`${listing.street_address} ${listing.city}, ${listing.state} ${listing.zip_code}`);
  await listings.post(Object.assign(listing, latLong), userId);
};

const cancel = async (listingId, userId) => {
  const listing = await search.byId(listingId);
  if (listing.host_id !== userId) {
    return 401;
  }
  await listings.remove(listingId);
  return 200;
};

module.exports = { get, host, cancel };
