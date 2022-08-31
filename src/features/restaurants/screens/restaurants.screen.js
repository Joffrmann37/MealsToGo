import React, { useContext, useState } from "react";
import { Container } from "../../../components/utilities/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { Spinner } from "../../../components/ui/spinner";
import appLayout from "../../../../layout.json";
import { Search } from "../components/search.component";
import { FavoritesBar } from "../../../components/favorites/favorites-bar.component";
import { RestaurantListings } from "../components/restaurant-list.component";

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favorites } = useContext(FavoritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <Container>
      <Search
        isFavoritesToggled={isToggled}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}
      {isLoading ? (
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
      ) : null}
      <RestaurantListings navigation={navigation} restaurants={restaurants} />
    </Container>
  );
};
