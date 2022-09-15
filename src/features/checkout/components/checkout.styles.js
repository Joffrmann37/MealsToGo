import styled from "styled-components/native";
import { Avatar, TextInput, Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${(props) => props.theme.spacing.sizes.xsmall};
`;

export const OrderButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.spacing.sizes.small};
  align-self: center;
  width: 80%;
`;

export const CheckoutButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.spacing.sizes.small};
  margin-top: ${(props) => props.theme.spacing.sizes.medium};
  margin-bottom: ${(props) => props.theme.spacing.sizes.small};
  align-self: center;
  width: 80%;
`;

export const ClearButton = styled(Button).attrs({
  color: colors.ui.error,
})`
  padding: ${(props) => props.theme.spacing.sizes.small};
  margin: ${(props) => props.theme.spacing.sizes.small};
  align-self: center;
  width: 80%;
`;
