const bcrypt = require('bcrypt');
const { users } = require('../database');

const addUser = async (username, password, phoneNumber, email) =>
  users.create(username, await bcrypt.hash(password, 1), phoneNumber, email);

const checkUser = async (username, password) => {
  const passwordHashed = await users.get(username);
  return passwordHashed ? bcrypt.compare(password, passwordHashed.password) : false;
};

module.exports = {
  addUser,
  checkUser,
};
