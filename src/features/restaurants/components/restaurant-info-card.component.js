import React from "react";
import { RestaurantInfoCardStyles } from "./restaurant-info-card.styles";
import { SvgXml } from "react-native-svg";

import { Text } from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Favorite } from "../../../components/favorites/favorite.component";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 3.2,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;
  const ratingArray = Array.from(new Array(Math.ceil(rating)));
  return (
    <RestaurantInfoCardStyles.RestaurantCard elevation={5} borderRadius={20}>
      <Favorite restaurant={restaurant} />
      <RestaurantInfoCardStyles.RestaurantCardCover
        key={name}
        source={{ uri: photos[0] }}
      />
      <RestaurantInfoCardStyles.Info>
        <Text variant="label">{name}</Text>
        <RestaurantInfoCardStyles.Section>
          <RestaurantInfoCardStyles.Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </RestaurantInfoCardStyles.Rating>
          <RestaurantInfoCardStyles.SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left">
              <RestaurantInfoCardStyles.Icon source={{ uri: icon }} />
            </Spacer>
          </RestaurantInfoCardStyles.SectionEnd>
        </RestaurantInfoCardStyles.Section>
        <RestaurantInfoCardStyles.Address>
          {address}
        </RestaurantInfoCardStyles.Address>
      </RestaurantInfoCardStyles.Info>
    </RestaurantInfoCardStyles.RestaurantCard>
  );
};
