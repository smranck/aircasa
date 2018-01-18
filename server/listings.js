const { listings, search } = require('../database');

const get = userId => listings.getAllByUserId(userId);

const host = (listing, userId) => listings.post(listing, userId);

const cancel = async (listingId, userId) => {
  const listing = await search.byId(listingId);
  if (listing.host_id !== userId) {
    return 401;
  }
  await listings.remove(listingId);
  return 200;
};

module.exports = { get, host, cancel };
