const airbnb = require('../../airbnb/get');

const connection = require('../config');
const listings = require('../queries/listings');

const insertData = async (location) => {
  const users = await connection.queryAsync('SELECT * FROM users');

  const data = await airbnb.search(location);

  return Promise.all(data.map(async (listing) => {
    const details = await airbnb.details(listing.listing.id);
    const formatted = await airbnb.format(listing, details);
    const user = users[Math.floor(Math.random() * users.length)];
    await listings.post(formatted, user.id);
    return console.log(`Added listing "${formatted.name}", posted by "${user.name}"`);
  }));
};

module.exports = insertData;
