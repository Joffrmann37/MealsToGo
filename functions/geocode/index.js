const { locationJson } = require("./geocode.mock");
const url = require("url");
const functions = require("firebase-functions");

module.exports.geocodeRequest = (request, response, client) => {
  let locations = locationJson.locations;

  const { city, mock } = url.parse(
    request.url.replace("%20", "_").toLowerCase(),
    true
  ).query;
  if (mock === true) {
    const filteredLocations = locations.filter((location) => {
      return location[city.replace(" ", "_").toLowerCase()];
    });
    return response.json(filteredLocations[0][city.toLowerCase()]);
  }

  client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      return response.json(res.data);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};
