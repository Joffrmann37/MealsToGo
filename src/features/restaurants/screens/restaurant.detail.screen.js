import React, { useState } from "react";
import { List } from "react-native-paper";
import { View, ScrollView, Image } from "react-native";
import { Container } from "../../../components/utilities/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import menu from "../../../../menu.json";
import styled from "styled-components/native";

const AccordionItem = styled(List.Accordion)`
  margin-left: -10px;
`;

const ItemImage = styled(Image)`
  width: ${(props) => props.theme.sizes.large};
  height: ${(props) => props.theme.sizes.large};
  resize-mode: contain;
  margin: 5px;
`;

export const RestaurantDetailScreen = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handlePress = () => {
    setSelectedCategory(selectedCategory);
    setCategories(() =>
      categories.map((category, i) => i.isExpanded === !i.isExpanded)
    );
  };

  const { restaurant } = route.params;
  return (
    <Container>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Section
          title="Menu"
          key={menu.categories.map(
            (category) => `${category.title}-${category.id}`
          )}
        >
          {menu.categories.length > 0 &&
            menu.categories.map((category) => (
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
