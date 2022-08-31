import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { RestaurantRow } from "./restaurant-row";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
    marging-bottom: props.theme.spacing.sizes.small};
  `;

export const RestaurantListings = ({ navigation, restaurants }) => {
  return (
    <RestaurantList
      data={restaurants}
      renderItem={({ item }) => {
        return <RestaurantRow item={item} navigation={navigation} />;
      }}
      keyExtractor={(item) => item.name}
    />
  );
};
