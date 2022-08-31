import React from "react";
import { TouchableOpacity } from "react-native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import appLayout from "../../../../layout.json";

const onRowPress = (nav, destination, item) => {
  nav.navigate(destination.screen, {
    restaurant: item,
  });
};

let row =
  appLayout.globalNavigation.tabInfo.tabs[0].screenHierarchy.listView.row;
row.onPress = onRowPress;

export const RestaurantRow = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        appLayout.globalNavigation.tabInfo.tabs[0].screenHierarchy.listView.row.onPress(
          navigation,
          row.action.destination,
          item
        )
      }
    >
      <Spacer>
        <RestaurantInfoCard restaurant={item} />
      </Spacer>
    </TouchableOpacity>
  );
};
