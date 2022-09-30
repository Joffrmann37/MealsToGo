import React from "react";

import { Container } from "../../../components/utilities/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  CartIconContainer,
  CartIcon,
  ReturnButton,
} from "../components/checkout.styles";

export const CheckoutSuccessScreen = ({ route, navigation }) => {
  const returnHome = () => {
    navigation.popToTop();
  };
  const isPresented =
    route.params !== undefined
      ? route.params.isPresentedFromAnotherScreen
      : false;
  return (
    <Container>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Text variant="label">Success!</Text>
        <Spacer position="top" size="medium">
          {isPresented ? (
            <ReturnButton icon="home" mode="contained" onPress={returnHome}>
              Return to dashboard
            </ReturnButton>
          ) : (
            <ReturnButton icon="cart" mode="contained" onPress={returnHome}>
              Return to cart
            </ReturnButton>
          )}
        </Spacer>
      </CartIconContainer>
    </Container>
  );
};
