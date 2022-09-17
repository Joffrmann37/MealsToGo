import React, { useContext } from "react";
import { CartCountLabel, CartRightView } from "../components/checkout.styles";
import { AddToCartButton } from "./add-to-cart-button";
import { DeleteFromCartButton } from "./delete-from-cart";
import { CartDeleteItemTypeButton } from "./cart-delete-item-type";
import { CartContext } from "../../../services/cart/cart.context";

export const CartAdjuster = ({ item, restaurant }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const updateSum = (shouldAdd = true, shouldForceDeleteItem = false) => {
    if (shouldAdd) {
      addToCart(item, restaurant);
    } else {
      console.log("Removing");
      removeFromCart(item, restaurant, shouldForceDeleteItem);
    }
  };

  return (
    <CartRightView>
      <AddToCartButton onPress={() => updateSum()} />
      <CartCountLabel>{item.count}</CartCountLabel>
      <DeleteFromCartButton onPress={() => updateSum(false)} />
      <CartDeleteItemTypeButton onPress={() => updateSum(false, true)} />
    </CartRightView>
  );
};
