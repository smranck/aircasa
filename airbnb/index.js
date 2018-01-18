const db = require('../database');
const connection = require('../database/config');
const get = require('./get');

const search = async (city, state) => {
  if (await db.search.check(city, state)) {
    return db.search.byCityState(city, state);
  }

  const query = `${city.toLowerCase()}, ${state.toLowerCase()}`;
  const data = await get.search(query);
  const users = await connection.queryAsync('SELECT * FROM users');

  const loadDetails = await Promise.all(data.map(async (listing) => {
    const quickListing = get.format(listing);
    const user = users[Math.floor(Math.random() * users.length)];
    const listingInDb = await db.listings.post(quickListing, user.id);
    console.log(`"${quickListing.name}" added, hosted by "${user.name}"`);
    return { listing, user, listingInDb };
  }));

  await Promise.race(loadDetails.map(async (detail) => {
    const details = await get.details(detail.listing.listing.id);
    const fullListing = get.format(detail.listing, details);
    await db.listings.update(detail.listingInDb.id, fullListing);
    console.log(`Full data for listing "${fullListing.name}", hosted by "${detail.user.name}", added`);
  }));

  await connection.queryAsync('INSERT INTO searches (query) VALUES (?)', [query]);

  return db.search.byCityState(city, state);
};

module.exports = { search };
