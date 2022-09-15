import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import appLayout from "../../../layout.json";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { CartNavigator } from "./cart.navigator";
import { MapNavigator } from "./map.navigator";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { CartContextProvider } from "../../services/cart/cart.context";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TabIcon = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Cart: "md-cart",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const filteredIcons = appLayout.globalNavigation.tabInfo.tabs.filter(
    (tab) => {
      return tab.name === route.name;
    }
  );

  let iconName =
    filteredIcons.length > 0 ? filteredIcons[0].iconName : TabIcon[route.name];
  return {
    tabBarIcon: ({ focused, size, color }) => (
      <Ionicons
        name={focused ? iconName : `${iconName}-outline`}
        size={size}
        color={color}
      />
    ),
    tabBarActiveTintColor: appLayout.globalNavigation.tabInfo.activeTintColor,
    tabBarInactiveTintColor:
      appLayout.globalNavigation.tabInfo.inactiveTintColor,
    headerShown: false,
  };
};

const MyTabs = () => {
  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
            <Tab.Navigator
              screenOptions={createScreenOptions}
              headerMode="none"
            >
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Cart" component={CartNavigator} />
              <Tab.Screen name="Map" component={MapNavigator} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};

export const AppNavigator = () => {
  return <MyTabs />;
};
