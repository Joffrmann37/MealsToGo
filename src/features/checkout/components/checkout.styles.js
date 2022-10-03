import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import {
  Avatar,
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../../../infrastructure/theme/colors";

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: Colors.blue300,
})`
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: 999;
`;

export const CartLoaderContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const CartLoader = styled(ActivityIndicator).attrs({
  size: 92,
  animating: true,
  color: Colors.blue300,
})``;

export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const CartDelete = styled(AntDesign).attrs({
  name: "delete",
  size: 20,
})`
  padding-top: ${(props) => props.theme.spacing.sizes.small};
`;

export const AddCartButton = styled.TouchableOpacity`
  padding-top: ${(props) => props.theme.spacing.sizes.small};
  padding-left: ${(props) => props.theme.spacing.sizes.small};
  padding-right: ${(props) => props.theme.spacing.sizes.xsmall};
`;

export const CartIncrement = styled(Ionicons).attrs({
  name: "add-circle-outline",
  size: 20,
})``;

export const CartCountLabel = styled.Text`
    font-family: ${(props) => props.theme.fonts.names.body}
    font-size: ${(props) => props.theme.fonts.sizes.caption}
    color: ${(props) => props.theme.colors.ui.primary};
    padding-top: ${(props) => props.theme.spacing.sizes.small};
    padding-left: ${(props) => props.theme.spacing.sizes.small};
    padding-right: ${(props) => props.theme.spacing.sizes.xsmall};
`;

export const CheckoutCountLabel = styled.Text`
    font-family: ${(props) => props.theme.fonts.names.body}
    font-size: ${(props) => props.theme.fonts.sizes.caption}
    color: ${(props) => props.theme.colors.ui.primary};
    padding-top: ${(props) => props.theme.spacing.sizes.small};
    padding-right: ${(props) => props.theme.spacing.sizes.large};
`;

export const DeleteCartButton = styled.TouchableOpacity`
  padding-top: ${(props) => props.theme.spacing.sizes.small};
  padding-left: ${(props) => props.theme.spacing.sizes.small};
  padding-right: ${(props) => props.theme.spacing.sizes.prettyLarge};
`;

export const CartDecrement = styled(MaterialCommunityIcons).attrs({
  name: "minus-circle-outline",
  size: 20,
})``;

export const CartRightView = styled.View`
  flex-direction: row;
  flex: 1;
  margin-right: ${(props) => props.theme.spacing.sizes.large};
  margin-top: ${(props) => props.theme.spacing.sizes.xsmall};
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

export const ReturnButton = styled(Button).attrs({
  color: colors.ui.primary,
})`
  padding: ${(props) => props.theme.spacing.sizes.small};
  margin-top: ${(props) => props.theme.spacing.sizes.medium};
  margin-bottom: ${(props) => props.theme.spacing.sizes.small};
  align-self: center;
  width: 80%;
`;

export const TopBackButton = styled(Button).attrs({
  color: colors.ui.primary,
})`
  padding: ${(props) => props.theme.spacing.sizes.small};
  margin: ${(props) => props.theme.spacing.sizes.xsmall};
  align-self: left;
  width: 10%;
`;

export const ClearButton = styled(Button).attrs({
  color: colors.ui.error,
})`
  padding: ${(props) => props.theme.spacing.sizes.small};
  margin: ${(props) => props.theme.spacing.sizes.small};
  align-self: center;
  width: 80%;
`;
