import React from "react";
import { AddCartButton, CartIncrement } from "./checkout.styles";

export const AddToCartButton = ({ onPress }) => {
  return (
    <AddCartButton onPress={onPress}>
      <CartIncrement />
    </AddCartButton>
  );
};
