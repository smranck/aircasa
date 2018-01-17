const bcrypt = require('bcrypt');
const { userHelper } = require('../../database');

const addUser = async (username, password, phoneNumber, email) =>
  userHelper.createUser(username, await bcrypt.hash(password, 1), phoneNumber, email);

const checkUser = async (username, password) => {
  const passwordHashed = await userHelper.getUser(username);
  return passwordHashed ? bcrypt.compare(password, passwordHashed.password) : false;
};

module.exports = {
  addUser,
  checkUser,
};
