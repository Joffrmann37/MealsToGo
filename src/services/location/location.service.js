import camelize from "camelize";

export const locationRequest = (searchTerm) => {
  console.log(searchTerm);
  return fetch(
    `https://us-central1-mealstogo-46bd5.cloudfunctions.net/geocode?city=${searchTerm}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  const loc = { lat, lng, viewport: geometry.viewport };
  console.log(result);
  return loc;
};
