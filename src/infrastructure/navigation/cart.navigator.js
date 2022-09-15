import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { CartScreen } from "../../features/checkout/screens/cart.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";

const CartStack = createStackNavigator();

export const CartNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
    </CartStack.Navigator>
  );
};
