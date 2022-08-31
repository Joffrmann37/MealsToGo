import React, { useContext } from "react";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { Container } from "../../../components/utilities/safe-area.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import appLayout from "../../../../layout.json";
import { RestaurantListings } from "../../restaurants/components/restaurant-list.component";

const NoFavoritesContainer = styled(Container)`
  justify-content: "center";
  align-items: "center";
  flex: 1;
`;

const onRowPress = (nav, destination, item) => {
  nav.navigate(destination.screen, {
    restaurant: item,
  });
};

let row =
  appLayout.globalNavigation.tabInfo.tabs[0].screenHierarchy.listView.row;
row.onPress = onRowPress;

export const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);
  return favorites.length ? (
    <Container>
      {/* {isLoading ? (
        <Spinner
          animating={
            appLayout.globalNavigation.tabInfo.tabs[0].screenHierarchy.spinner
              .animating
          }
          size={
            appLayout.globalNavigation.tabInfo.tabs[0].screenHierarchy.spinner
              .size
          }
        />
      ) : null} */}
      <RestaurantListings navigation={navigation} restaurants={favorites} />
    </Container>
  ) : (
    <NoFavoritesContainer>
      <Text variant="label">You have no favorites at this time</Text>
    </NoFavoritesContainer>
  );
};
