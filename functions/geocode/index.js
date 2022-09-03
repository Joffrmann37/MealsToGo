const { locationJson } = require("./geocode.mock");
const url = require("url");

module.exports.geocodeRequest = (request, response) => {
  console.log(locationJson.locations);
  let locations = locationJson.locations;

  const { city } = url.parse(
    request.url.replace("%20", "_").toLowerCase(),
    true
  ).query;
  console.log(request.url);
  const filteredLocations = locations.filter((location) => {
    return location[city.replace(" ", "_").toLowerCase()];
  });
  return response.json(filteredLocations[0][city.toLowerCase()]);
};
