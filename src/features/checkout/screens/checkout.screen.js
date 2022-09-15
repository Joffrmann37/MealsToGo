import React, { useState } from "react";
import { List } from "react-native-paper";
import { ScrollView } from "react-native";
import { CustomCreditCardInput } from "../components/credit-card.component";
import { NameInput } from "../components/checkout.styles";
import { Text } from "../../../components/typography/text.component";
import { Container } from "../../../components/utilities/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CheckoutButton } from "../components/checkout.styles";
import { ItemImage } from "../../../components/ui/list-styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

export const CheckoutScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const { cart, sum, restaurants } = route.params;

  return (
    <Container>
      <ScrollView>
        {restaurants.length === 1 && (
          <RestaurantInfoCard restaurant={restaurants[0]} />
        )}
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
                description={`$${parseFloat(item.price).toFixed(2)}`}
                // eslint-disable-next-line react/no-unstable-nested-components
                left={() => (
                  <ItemImage
                    source={{
                      uri: item.image,
                    }}
                  />
                )}
              />
            );
          })}
        </List.Section>
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
          {name.length > 0 && <CustomCreditCardInput name={name} />}
        </Spacer>
        {name.length > 0 && (
          <Spacer position="top" size="medium">
            <CheckoutButton
              icon="cash-register"
              mode="contained"
              onPress={() => {
                //navigation.navigate("CheckoutScreen");
              }}
            >
              Proceed To Checkout
            </CheckoutButton>
          </Spacer>
        )}
      </ScrollView>
    </Container>
  );
};
