import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
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
  TopBackButton,
  CartLoader,
  CartLoaderContainer,
} from "../components/checkout.styles";
import { ItemImage } from "../../../components/ui/list-styles";

export const MyComponent = ({ restaurant, index }) => (
  <View>
    <RestaurantInfoCard restaurant={restaurant} key={index} />
    {restaurant !== null &&
      restaurant.items &&
      restaurant.items.map((item) => {
        return (
          <List.Item
            title={`${item.name}`}
            titleNumberOfLines={3}
            key={`${item.id}-${index}`}
            description={`$${parseFloat(item.price * item.count).toFixed(2)}`}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={() => (
              <ItemImage
                source={{
                  uri: item.image,
                }}
              />
            )}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => <CartAdjuster item={item} restaurant={restaurant} />}
          />
        );
      })}
  </View>
);

export const CartScreen = ({ route, navigation }) => {
  const isPresented =
    route.params !== undefined
      ? route.params.isPresentedFromAnotherScreen
      : false;
  const { cart, clearCart, sum, isLoading } = useContext(CartContext);
  const restaurants = cart;
  console.log(`Is loading? ${isLoading}`);
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
      {isPresented && (
        <Spacer position="top" size="xsmall">
          <TopBackButton
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
        </Spacer>
      )}
      {isLoading && (
        <CartLoaderContainer>
          <CartLoader />
        </CartLoaderContainer>
      )}
      {!isLoading && (
        <ScrollView>
          {isPresented && (
            <Spacer position="top" size="small">
              <Text>Your Order</Text>
            </Spacer>
          )}
          {restaurants.map((restaurant, index) => {
            return (
              <MyComponent restaurant={restaurant} index={index} key={index} />
            );
          })}
          <Text>Total: ${sum}</Text>
          <Spacer position="top" size="xsmall">
            <CheckoutButton
              icon="cash-register"
              mode="contained"
              onPress={() => {
                navigation.navigate("Checkout", {
                  cart,
                  sum,
                  restaurants,
                  isPresentedFromAnotherScreen: isPresented,
                });
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
      )}
    </Container>
  );
};
