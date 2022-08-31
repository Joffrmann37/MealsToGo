import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const filteredLocations = locations.filter((location) => {
      return location[searchTerm];
    });
    if (!filteredLocations.length) {
      reject("not found");
    }
    const locationMock = filteredLocations[0][searchTerm];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
