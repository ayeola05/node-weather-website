const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYXllb2xhMDUiLCJhIjoiY2wyY2N3eDF2MDNkNjNra2cyNHJ2OHY4NyJ9.uJF6lcRPf-3hIqZ01Jfoig&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    }
    else if (response.body.message === "Not Authorized - No Token"){
      callback("Unable to find location services", undefined)
    }else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
