import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication-context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [cart, setCart] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, item) => {
      return (acc += item.price * item.count);
    }, 0);
    setSum(parseFloat(newSum).toFixed(2));
  }, [cart]);

  const add = (item, rst) => {
    const filteredItems = cart.filter(
      (filteredItem) =>
        item.id === filteredItem.id && item.name === filteredItem.name
    );
    if (filteredItems.length > 0) {
      const filteredItemsNotIncluded = cart.filter(
        (filteredItem) =>
          item.id !== filteredItem.id && item.name !== filteredItem.name
      );
      console.log(`Filtered length: ${filteredItems.length}`);
      item.count += 1;
      setCart([...filteredItemsNotIncluded, item]);
    } else {
      if (item.count) {
        item.count += 1;
      } else {
        item.count = 1;
      }
      setCart([...cart, item]);
    }
    setRestaurants([...restaurants, rst]);
  };

  const remove = (item, rst, shouldForceDeleteItem = false) => {
    // const filteredItemsNotIncluded = cart.filter(
    //   (filteredItem) =>
    //     item.id !== filteredItem.id && item.name !== filteredItem.name
    // );
    //console.log(cart);
    //cart.splice(cart.length - 1, 1);
    const filteredItems = cart.filter(
      (filteredItem) =>
        item.id === filteredItem.id && item.name === filteredItem.name
    );
    const filteredItemsNotIncluded = cart.filter(
      (filteredItem) =>
        item.id !== filteredItem.id && item.name !== filteredItem.name
    );

    if (shouldForceDeleteItem) {
      item.count = 0;
    } else {
      item.count -= 1;
    }
    if (filteredItems.length > 0) {
      if (item.count === 0) {
        console.log("Nothing");
        if (filteredItemsNotIncluded.length === 0) {
          console.log("Noooo");
          setCart([]);
          return;
        } else {
          setCart(filteredItemsNotIncluded);
        }
      } else {
        setCart([...filteredItemsNotIncluded, item]);
      }
    } else if (item.count) {
      if (item.count === 0) {
        console.log("Nothing");
        setCart([]);
      }
    } else {
      item.count = 1;
    }

    setRestaurants([...restaurants, rst]);
  };

  const clear = () => {
    setCart([]);
    setRestaurants([]);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        removeFromCart: remove,
        clearCart: clear,
        setSum,
        restaurants,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
