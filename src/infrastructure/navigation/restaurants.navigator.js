import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant.detail.screen";
import { CartScreen } from "../../features/checkout/screens/cart.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="Restaurant Detail"
        component={RestaurantDetailScreen}
        options={{
          headerShown: true,
        }}
      />
      <RestaurantStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
        }}
      />
      <RestaurantStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: true,
        }}
      />
    </RestaurantStack.Navigator>
  );
};
