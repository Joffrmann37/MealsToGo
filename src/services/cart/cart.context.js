import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication-context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [cart, setCart] = useState([]);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }

    const newSum = cart.reduce((acc, restaurant) => {
      let cost = 0;
      restaurant.items.forEach((item) => {
        cost += item.price * item.count;
      });
      return (acc += cost);
    }, 0);
    console.log(parseFloat(newSum).toFixed(2));
    setSum(parseFloat(newSum).toFixed(2));
  }, [cart]);

  const add = (item, rst) => {
    item.restaurantId = rst.placeId;
    const filteredRestaurants = JSON.parse(JSON.stringify(cart)).filter(
      (filteredRestaurant) => rst.placeId === filteredRestaurant.placeId
    );
    if (rst.items) {
      const items = JSON.parse(JSON.stringify(rst.items));
      const filteredItems = items.filter(
        (filteredItem) =>
          item.id === filteredItem.id &&
          item.restaurantId === filteredItem.restaurantId
      );
      if (
        filteredItems.length > 0 &&
        filteredRestaurants.length > 0 &&
        item.restaurantId === filteredItems[0].restaurantId
      ) {
        item.count += 1;
      } else {
        item.count = 1;
        rst.items.push(item);
      }
    } else {
      item.count = 1;
      rst.items = [item];
    }

    if (!cart.includes(rst)) {
      setCart([...cart, rst]);
    } else {
      setCart([...cart]);
    }
  };

  const remove = (item, rst, shouldForceDeleteItem = false) => {
    const filteredItems = rst.items.filter(
      (filteredItem) =>
        item.id === filteredItem.id && item.name === filteredItem.name
    );

    const filteredItemsNotIncluded = rst.items.filter(
      (filteredItem) =>
        item.id !== filteredItem.id && item.name !== filteredItem.name
    );

    const filteredRestaurants = cart.filter(
      (filteredRestaurant) =>
        rst.placeId === filteredRestaurant.placeId &&
        rst.name === filteredRestaurant.name
    );

    const filteredRestaurantsNotIncluded = cart.filter(
      (filteredRestaurant) =>
        rst.placeId !== filteredRestaurant.placeId &&
        rst.name !== filteredRestaurant.name
    );

    if (shouldForceDeleteItem) {
      console.log("Forcing");
      item.count = 0;
      if (item.count === 0) {
        rst.items = filteredItemsNotIncluded;
        if (filteredRestaurants.length > 0) {
          const arr =
            rst.items.length > 0
              ? [...filteredRestaurants, ...filteredRestaurantsNotIncluded]
              : [...filteredRestaurantsNotIncluded];
          setCart(arr);
        } else if (filteredRestaurantsNotIncluded.length) {
          setCart([filteredRestaurantsNotIncluded]);
        } else {
          clear();
        }
      } else {
        if (filteredRestaurantsNotIncluded.length) {
          console.log("Filtered restaurants not included");
          if (filteredRestaurants.length > 0) {
            const arr =
              rst.items.length > 0
                ? [...filteredRestaurants, ...filteredRestaurantsNotIncluded]
                : [...filteredRestaurantsNotIncluded];
            setCart(arr);
          } else {
            setCart([...filteredRestaurantsNotIncluded]);
          }
        } else if (rst.items.length) {
          setCart([...filteredRestaurants]);
        } else {
          clear();
        }
      }
    } else {
      item.count -= 1;
      if (item.count === 0) {
        rst.items = filteredItemsNotIncluded;
        if (filteredRestaurantsNotIncluded.length) {
          if (filteredRestaurants.length > 0) {
            const arr =
              rst.items.length > 0
                ? [...filteredRestaurants, ...filteredRestaurantsNotIncluded]
                : [...filteredRestaurantsNotIncluded];
            setCart(arr);
          } else {
            setCart([filteredRestaurantsNotIncluded]);
          }
        } else if (rst.items.length) {
          setCart([...filteredRestaurants]);
        } else {
          clear();
        }
      } else {
        // if (filteredRestaurants.length) {
        //   console.log(`You have two items now: ${rst.items.length}`);
        //   const arr =
        //     rst.items.length > 0
        //       ? [...filteredRestaurants, ...filteredRestaurantsNotIncluded]
        //       : [...filteredRestaurantsNotIncluded];
        //   setCart(arr);
        // }
        // const indexOfObject = rst.items.findIndex((itemObj) => {
        //   return item.id === itemObj.id;
        // });
        // rst.items.splice(indexOfObject, 1);
        // const restaurantIndex = cart.findIndex((restaurantObj) => {
        //   return rst.placeId === restaurantObj.placeId;
        // });
        // console.log(`Index: ${restaurantIndex}`);
        // cart[restaurantIndex] = rst;
        setCart([...cart]);
      }
    }
  };

  const clear = () => {
    cart.forEach((rst) => {
      rst.items = [];
    });
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        removeFromCart: remove,
        clearCart: clear,
        setSum,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
