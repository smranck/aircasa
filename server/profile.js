const { users } = require('../database');

const getAllUserInfo = userId => users.getAllUserInfo(userId);


module.exports = { getAllUserInfo };
