const connection = require('../config');

const getAllByUserId = userId =>
  connection.queryAsync('SELECT * FROM listings WHERE host_id = ?', [userId]);

const post = (listing, userId) =>
  connection
    .queryAsync(
      'INSERT INTO listings (num_guests, bedrooms, bathrooms, name, description, summary, neighborhood, street_address, zip_code, city, state, cancellation_policy, nightly_price, pic_url, rating, lat, lng, host_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        listing.num_guests,
        listing.bedrooms,
        listing.bathrooms,
        listing.name,
        listing.description,
        listing.summary,
        listing.neighborhood,
        listing.street_address,
        listing.zip_code,
        listing.city,
        listing.state,
        listing.cancellation_policy,
        listing.nightly_price,
        listing.pic_url,
        listing.rating,
        listing.lat,
        listing.lng,
        userId,
      ],
    )
    .then(data => connection.queryAsync('SELECT * FROM listings WHERE id = ?', [data.insertId]))
    .then(data => data[0]);

const update = (id, listing) =>
  connection
    .queryAsync(
      'UPDATE listings SET description = ?, summary = ?, zip_code = ?, state = ?, cancellation_policy = ?, images = ? WHERE id = ?',
      [
        listing.description,
        listing.summary,
        listing.zip_code,
        listing.state,
        listing.cancellation_policy,
        listing.images,
        id,
      ],
    )
    .then(data => connection.queryAsync('SELECT * FROM listings WHERE id = ?', [data.insertId]))
    .then(data => data[0]);

const remove = listingId => connection.queryAsync('DELETE FROM listings WHERE id = ?', [listingId]);

const parse = (listing) => {
  if (listing.images !== null) {
    const images = { images: JSON.parse(listing.images) };
    return Object.assign(listing, images);
  }
  return listing;
};

module.exports = {
  getAllByUserId,
  post,
  remove,
  update,
  parse,
};
