import React, { useContext } from "react";
import { CartCountLabel, CartRightView } from "../components/checkout.styles";
import { AddToCartButton } from "./add-to-cart-button";
import { DeleteFromCartButton } from "./delete-from-cart";
import { CartDeleteItemTypeButton } from "./cart-delete-item-type";
import { CartContext } from "../../../services/cart/cart.context";

export const CartAdjuster = ({ item, restaurant }) => {
  let filteredItems = restaurant.items.filter(
    (filteredItem) =>
      item.id === filteredItem.id && item.restaurantId === restaurant.placeId
  );
  const { addToCart, removeFromCart } = useContext(CartContext);
  let itemCount = filteredItems.length;

  const updateSum = (shouldAdd = true, shouldForceDeleteItem = false) => {
    if (shouldAdd) {
      addToCart(item, restaurant);
      filteredItems.push(item);
    } else {
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
