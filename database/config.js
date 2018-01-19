const mysql = require('mysql');

const connection = mysql.createPool(process.env.DATABASE_URL || 'mysql://root:@localhost/airbnb', {
  connectionLimit: 2,
});

connection.queryAsync = function queryAsync(...args) {
  return new Promise((resolve, reject) => {
    this.query(...args, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = connection;

if (process.env.INSERTSAMPLEDATA) {
  const sampleData = require('./sampleData');

  sampleData('lake tahoe')
    .then(console.log('added sample data'))
    .catch(console.error);
}
