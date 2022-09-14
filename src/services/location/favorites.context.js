import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication-context";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favorites, setFavorites] = useState([]);
  const [isStoring, setIsStoring] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(true);
  const storeFavorites = async (value, uid) => {
    try {
      const favoriteJSON = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, favoriteJSON);
      setShouldLoad(true);
    } catch (e) {}
  };
  const loadFavorites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
      return value != null ? setFavorites(JSON.parse(value)) : null;
    } catch (e) {}
  };
  const add = (restaurant) => {
    setFavorites([...favorites, restaurant]);
    if (user && user.user.uid && favorites.length) {
      storeFavorites([...favorites, restaurant], user.user.uid);
    }
  };
  const remove = (restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavorites(newFavorites);
    if (user && user.user.uid && favorites.length) {
      storeFavorites(newFavorites, user.user.uid);
    }
  };
  useEffect(() => {
    if (user && user.user.uid && shouldLoad) {
      loadFavorites(user.user.uid);
      setShouldLoad(false);
    }
  }, [user, shouldLoad]);
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites: add,
        removeFromFavorites: remove,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
