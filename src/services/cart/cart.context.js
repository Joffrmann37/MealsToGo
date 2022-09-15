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
      return (acc += item.price);
    }, 0);
    setSum(parseFloat(newSum).toFixed(2));
  }, [cart]);

  const add = (item, rst) => {
    setCart([...cart, item]);
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
        clearCart: clear,
        restaurants,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
