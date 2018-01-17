const fetch = require('node-fetch');

const getLatLong = async (address) => {
  const geoCode = await fetch(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
    process.env.GEOCODEKEY
  }`)).then(resp => resp.json());
  if (geoCode.status === 'OK') {
    return geoCode.results[0].geometry.location;
  }
  return {
    lat: 'N/A',
    lng: 'N/A',
  };
};

module.exports = {
  getLatLong,
};
