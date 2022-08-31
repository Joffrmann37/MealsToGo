import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen } from "../../features/map/screens/map.screen";

const MapStack = createStackNavigator();

export const MapNavigator = () => {
  return (
    <MapStack.Navigator headerMode="none">
      <MapStack.Screen name="MapScreen" component={MapScreen} />
    </MapStack.Navigator>
  );
};
