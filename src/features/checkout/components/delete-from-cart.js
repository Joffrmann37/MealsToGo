import React from "react";
import { DeleteCartButton, CartDecrement } from "./checkout.styles";

export const DeleteFromCartButton = ({ onPress }) => {
  return (
    <DeleteCartButton onPress={onPress}>
      <CartDecrement />
    </DeleteCartButton>
  );
};
