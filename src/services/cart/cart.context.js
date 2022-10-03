import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication-context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [shouldLoad, setShouldLoad] = useState(true);
  const [sum, setSum] = useState(0);

  useEffect(
    () => {
      if (shouldLoad) {
        loadCart(user.user.uid);
      }

      if (!cart.length) {
        if (user && user.user.uid && shouldLoad) {
          setShouldLoad(false);
        } else {
          setSum(0);
          return;
        }
      }

      const newSum = cart.reduce((acc, restaurant) => {
        let cost = 0;
        restaurant.items.forEach((item) => {
          cost += item.price * item.count;
        });
        return (acc += cost);
      }, 0);

      setShouldLoad(false);
      setSum(parseFloat(newSum).toFixed(2));
    },
    [cart, user, shouldLoad],
    storeCart
  );

  const storeCart = async (cartArr, uid) => {
    try {
      console.log(`Storing cart for ${uid}`);
      setIsLoading(true);
      await AsyncStorage.setItem(`@cart-${uid}`, JSON.stringify(cartArr));
      setIsLoading(false);
    } catch (error) {
      // Error saving data
    }
  };

  const deleteCart = async (uid) => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem(`@cart-${uid}`);
      setIsLoading(false);
    } catch (error) {}
  };

  const loadCart = async (uid) => {
    // try {
    //   await AsyncStorage.removeItem(`@cart-${uid}`);
    //   return true;
    // } catch (exception) {
    //   return false;
    // }
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      return value != null ? setCart(JSON.parse(value)) : null;
    } catch (e) {}
  };

  const add = (item, rst) => {
    item.restaurantId = rst.placeId;
    const filteredRestaurants = JSON.parse(JSON.stringify(cart)).filter(
      (filteredRestaurant) => rst.placeId === filteredRestaurant.placeId
    );
    if (filteredRestaurants.length && filteredRestaurants[0].items) {
      const items = filteredRestaurants[0].items;
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
        console.log(`Existing count: ${filteredItems[0].count}`);
        filteredItems[0].count += 1;
        console.log(`Updated count: ${filteredItems[0].count}`);
      } else {
        console.log("Same item");
        item.count = 1;
        console.log(rst);
        filteredRestaurants[0].items.push(item);
      }
    } else {
      item.count = 1;
      console.log(item.count);
      rst.items = [item];
    }

    if (!cart.includes(rst) && !filteredRestaurants.length) {
      setCart([...cart, rst]);
      console.log("Adding restaurant");
    } else {
      setCart([...cart]);
    }

    if (user && user.user.uid) {
      if (filteredRestaurants.length) {
        console.log("Has restaurant");
        const index = cart.findIndex((rest) => rest.placeId === rst.placeId);
        cart[index] = filteredRestaurants[0];
        console.log("Restaurant index: " + index);
        storeCart([...cart], user.user.uid);
        return;
      }
      storeCart([...cart, rst], user.user.uid);
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
        setCart([...cart]);
      }
    }

    if (user && user.user.uid && cart.length) {
      storeCart([...cart], user.user.uid);
    }
  };

  const clear = () => {
    cart.forEach((rst) => {
      rst.items = [];
    });
    setCart([]);
    if (user && user.user.uid) {
      deleteCart(user.user.uid);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        removeFromCart: remove,
        clearCart: clear,
        setSum,
        isLoading,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
