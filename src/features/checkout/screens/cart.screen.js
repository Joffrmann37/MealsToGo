import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Container } from "../../../components/utilities/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { CartAdjuster } from "../components/cart-adjuster";
import {
  CartIconContainer,
  CartIcon,
  CheckoutButton,
  ClearButton,
} from "../components/checkout.styles";
import { ItemImage } from "../../../components/ui/list-styles";

export const CartScreen = ({ route, navigation }) => {
  const { cart, restaurants, clearCart, sum } = useContext(CartContext);
  if (!cart.length || !restaurants.length) {
    return (
      <Container>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ScrollView>
        {restaurants.length === 1 && (
          <RestaurantInfoCard restaurant={restaurants[0]} />
        )}
        <Spacer position="left" size="xsmall">
          <Spacer position="top" size="small">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map((item, index) => {
              return (
                <List.Item
                  title={
                    restaurants.length > 1
                      ? `${restaurants[index].name}\n${item.name}`
                      : `${item.name}`
                  }
                  titleNumberOfLines={3}
                  description={`$${parseFloat(item.price * item.count).toFixed(
                    2
                  )}`}
                  // eslint-disable-next-line react/no-unstable-nested-components
                  left={() => (
                    <ItemImage
                      source={{
                        uri: item.image,
                      }}
                    />
                  )}
                  // eslint-disable-next-line react/no-unstable-nested-components
                  right={() => (
                    <CartAdjuster item={item} restaurant={restaurants[index]} />
                  )}
                />
              );
            })}
          </List.Section>
          <Text>Total: ${sum}</Text>
        </Spacer>
        <Spacer position="top" size="xsmall">
          <CheckoutButton
            icon="cash-register"
            mode="contained"
            onPress={() => {
              navigation.navigate("Checkout", { cart, sum, restaurants });
            }}
          >
            Proceed To Checkout
          </CheckoutButton>
        </Spacer>
        <Spacer position="top" size="xsmall">
          <ClearButton icon="cart-off" mode="contained" onPress={clearCart}>
            Clear Cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </Container>
  );
};
