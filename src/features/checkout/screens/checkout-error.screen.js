import React from "react";

import { Container } from "../../../components/utilities/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  CartIconContainer,
  CartIcon,
  ReturnButton,
} from "../components/checkout.styles";
import { colors } from "../../../infrastructure/theme/colors";

export const CheckoutErrorScreen = ({ navigation, route }) => {
  const returnHome = () => {
    navigation.popToTop();
  };
  const { error = "" } = route.params;
  const isPresented =
    route.params !== undefined
      ? route.params.isPresentedFromAnotherScreen
      : false;
  return (
    <Container>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Spacer position="top" size="small">
          <Text variant="label">{error}</Text>
        </Spacer>
        <Spacer position="top" size="medium">
          <ReturnButton
            icon="arrow-left"
            mode="contained"
            onPress={() => navigation.goBack()}
          >
            Retry Payment
          </ReturnButton>
        </Spacer>
        <Spacer position="top" size="small">
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
