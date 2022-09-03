const { mocks, addMockImage } = require("./mock");
const url = require("url");

module.exports.placesRequest = (request, response) => {
  const { location } = url.parse(request.url.toLowerCase(), true).query;
  const data = mocks[location];
  if (data) {
    data.results = data.results.map(addMockImage);
  }

  return response.json(data);
};
