import React, { useState, useContext } from "react";
import { List } from "react-native-paper";
import { View, ScrollView } from "react-native";
import { Container } from "../../../components/utilities/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TopBackButton } from "../../checkout/components/checkout.styles";
import menu from "../../../../menu.json";
import { CartContext } from "../../../services/cart/cart.context";
import styled from "styled-components/native";
import { ItemImage } from "../../../components/ui/list-styles";

const AccordionItem = styled(List.Accordion)`
  margin-left: -10px;
`;

export const RestaurantDetailScreen = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handlePress = () => {
    setSelectedCategory(selectedCategory);
    setCategories(() =>
      categories.map((category, i) => i.isExpanded === !i.isExpanded)
    );
  };

  const { restaurant } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <Container>
      <Spacer position="top" size="xsmall">
        <TopBackButton icon="arrow-left" onPress={() => navigation.goBack()} />
      </Spacer>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Section
          title="Menu"
          key={restaurant.categories.map(
            (category) => `${category.title}-${category.id}`
          )}
        >
          {restaurant.categories.length > 0 &&
            restaurant.categories.map((category) => (
              <AccordionItem
                title={category.title}
                // eslint-disable-next-line react/no-unstable-nested-components
                left={(props) => (
                  <List.Icon {...props} icon={category.iconName} />
                )}
                expanded={category.isExpanded}
                onPress={() => {
                  category.isExpanded = !category.isExpanded;
                  handlePress(category);
                }}
                key={`${category.title}-${category.id}`}
              >
                {category.items.map((item) => (
                  <View key={`${item.name}-${category.id}`}>
                    <List.Item
                      title={item.name}
                      description={`$${parseFloat(item.price).toFixed(2)}`}
                      // eslint-disable-next-line react/no-unstable-nested-components
                      left={() => (
                        <ItemImage
                          source={{
                            uri: item.image,
                          }}
                        />
                      )}
                      onPress={() => {
                        addToCart(item, restaurant);
                        navigation.navigate("Cart", {
                          isPresentedFromAnotherScreen: true,
                        });
                      }}
                    />
                  </View>
                ))}
              </AccordionItem>
            ))}
        </List.Section>
      </ScrollView>
    </Container>
  );
};
