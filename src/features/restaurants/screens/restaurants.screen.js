import React, { useContext, useState } from "react";
import { Container } from "../../../components/utilities/safe-area.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { Spinner } from "../../../components/ui/spinner";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import appLayout from "../../../../layout.json";
import { Search } from "../components/search.component";
import { FavoritesBar } from "../../../components/favorites/favorites-bar.component";
import { RestaurantListings } from "../components/restaurant-list.component";

export const RestaurantsScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favorites } = useContext(FavoritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!locationError;

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
      {hasError && !isLoading && (
        <Spacer position="bottom" size="small">
          <Text variant="error">Something went wrong retrieving the data.</Text>
        </Spacer>
      )}
      {!hasError && (
        <RestaurantListings navigation={navigation} restaurants={restaurants} />
      )}
    </Container>
  );
};
