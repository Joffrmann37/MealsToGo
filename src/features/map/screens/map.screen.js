import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components";
import { Search } from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { MapCallout } from "../components/map.callout.component";
import appLayout from "../../../../layout.json";

const Map = styled(MapView)`
  height: ${appLayout.globalNavigation.tabInfo.tabs[1].screenHierarchy.mapView
    .size.width};
  width: ${appLayout.globalNavigation.tabInfo.tabs[1].screenHierarchy.mapView
    .size.height};
`;

const RestaurantMap = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  let markers = restaurants.map((restaurant) => {
    return {
      key: restaurant.name,
      title: restaurant.name,
      coordinate: restaurant.geometry.location,
      restaurant,
      callout: {
        action: {
          onPress: () =>
            navigation.navigate("RestaurantDetail", { restaurant }),
        },
      },
    };
  });

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);
  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {markers.map((marker) => {
          const { restaurant, callout } = marker;
          const { action } = callout;
          return (
            <MapView.Marker
              key={`${marker.name}-${marker.restaurant.placeId}`}
              title={marker.name}
              coordinate={{
                latitude: marker.coordinate.lat,
                longitude: marker.coordinate.lng,
              }}
            >
              <MapView.Callout onPress={action.onPress}>
                <MapCallout restaurant={restaurant} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
};

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  if (!location) {
    return (
      <Map
        region={{
          latitude: 0,
          longitude: 0,
        }}
      />
    );
  }
  return <RestaurantMap navigation={navigation} />;
};
