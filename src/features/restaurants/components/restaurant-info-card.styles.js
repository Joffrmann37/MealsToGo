import styled from "styled-components/native";
import { Card } from "react-native-paper";

const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.spacing.sizes.small}
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.names.body}
  font-size: ${(props) => props.theme.fonts.sizes.caption}
  color: ${(props) => props.theme.colors.ui.primary};
`;

const Info = styled.View`
  padding: ${(props) => props.theme.spacing.sizes.small};
`;

const Rating = styled.View`
  flex-direction: row
  padding-top: ${(props) => props.theme.spacing.sizes.xsmall}
  padding-bottom: ${(props) => props.theme.spacing.sizes.xsmall};
`;

const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const RestaurantInfoCardStyles = {
  RestaurantCard,
  RestaurantCardCover,
  Address,
  Info,
  Rating,
  Section,
  SectionEnd,
  Icon,
};
