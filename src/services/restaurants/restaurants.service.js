import camelize from "camelize";

export const restaurantsRequest = (location) => {
  return fetch(
    `https://us-central1-mealstogo-46bd5.cloudfunctions.net/placesNearby?location=${location}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  //console.log(camelize(mappedResults));
  return camelize(mappedResults);
};
