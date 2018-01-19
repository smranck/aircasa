const connection = require('../config');

const get = username =>
  connection.queryAsync('SELECT * FROM users WHERE name = ?', [username]).then(data => data[0]);

const create = (username, password, phoneNumber, email) =>
  connection.queryAsync(
    'INSERT INTO users (name, password, phoneNumber, email) VALUES (?, ?, ?, ?)',
    [username, password, phoneNumber, email],
  );

const getById = id =>
  connection.queryAsync('SELECT * FROM users WHERE id = ?', [id]).then(data => data[0]);

const getAllUserInfo = id =>
  connection.queryAsync('SELECT * FROM users WHERE id = ?', [id]).then(data => data[0]);

module.exports = {
  get,
  create,
  getById,
  getAllUserInfo,
};
