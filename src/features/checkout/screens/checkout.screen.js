import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { CustomCreditCardInput } from "../components/credit-card.component";
import { NameInput, PaymentProcessing } from "../components/checkout.styles";
import { Text } from "../../../components/typography/text.component";
import { Container } from "../../../components/utilities/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CheckoutButton, TopBackButton } from "../components/checkout.styles";
import { MyComponent } from "./cart.screen";
import { payRequest } from "../../../services/checkout/checkout.service";
import { CartContext } from "../../../services/cart/cart.context";

export const CheckoutScreen = ({ route, navigation }) => {
  const isPresented =
    route.params !== undefined
      ? route.params.isPresentedFromAnotherScreen
      : false;
  const { cart, clearCart, sum } = useContext(CartContext);
  const [name, setName] = useState("");
  const { restaurants } = route.params;
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
        isPresentedFromAnotherScreen: isPresented,
      });
      return;
    }
    payRequest(card.id, sum * 100, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccess", {
          isPresentedFromAnotherScreen: isPresented,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate("CheckoutError", {
          error: err,
          isPresentedFromAnotherScreen: isPresented,
        });
      });
  };

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
      {isLoading && <PaymentProcessing />}
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
        <Spacer position="top" size="medium">
          <NameInput
            value={name}
            placeholder="Enter Full Name"
            onChangeText={(t) => {
              setName(t);
            }}
          />
        </Spacer>
        <Spacer position="top" size="medium">
          {name.length > 0 && (
            <CustomCreditCardInput
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong processing your credit card",
                })
              }
            />
          )}
        </Spacer>
        {name.length > 0 && (
          <>
            <Spacer position="top" size="medium">
              <CheckoutButton
                icon="cash-register"
                mode="contained"
                disabled={isLoading}
                onPress={onPay}
              >
                Complete Order
              </CheckoutButton>
            </Spacer>
          </>
        )}
      </ScrollView>
    </Container>
  );
};
