import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { CartScreen } from "../../features/checkout/screens/cart.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-success.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-error.screen";

const CartStack = createStackNavigator();

export const CartNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CartStack.Screen
        name="CartScr"
        options={{
          header: () => null,
          headerTitle: "Cart",
        }}
        component={CartScreen}
      />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
      <CartStack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="CheckoutError"
        component={CheckoutErrorScreen}
        options={{
          headerShown: false,
        }}
      />
    </CartStack.Navigator>
  );
};
