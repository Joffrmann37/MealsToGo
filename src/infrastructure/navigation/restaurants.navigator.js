import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant.detail.screen";
import { CartScreen } from "../../features/checkout/screens/cart.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-error.screen";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-success.screen";

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
          headerShown: false,
        }}
      />
      <RestaurantStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <RestaurantStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: false,
        }}
      />
      <RestaurantStack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
        options={{
          headerShown: false,
          headerTitle: "Payment Successful",
        }}
      />
      <RestaurantStack.Screen
        name="CheckoutError"
        component={CheckoutErrorScreen}
        options={{
          headerShown: false,
          headerTitle: "Payment Failed",
        }}
      />
    </RestaurantStack.Navigator>
  );
};
