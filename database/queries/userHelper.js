const connection = require('../config.js');

const getUser = (username) =>
  connection
    .queryAsync('SELECT * FROM users WHERE name = ?', [username])
    .then((data) => data[0]);

const createUser = (username, password, phoneNumber, email) =>
  connection.queryAsync(
    'INSERT INTO users (name, password, phoneNumber, email) VALUES (?, ?, ?, ?)',
    [username, password, phoneNumber, email],
  );

const getUserById = (id) =>
  connection
    .queryAsync('SELECT * FROM users WHERE id = ?', [id])
    .then((data) => data[0]);

module.exports = {
  getUser,
  createUser,
  getUserById,
};
