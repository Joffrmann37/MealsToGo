import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
import * as Constants from "../MealsToGo/src/Constants/Constants";
import Utilities from "./src/utils/Utilities";
import styled, { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";

import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";
import { FavoritesContextProvider } from "./src/services/favorites/favorites.context";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication-context";

const Status = styled(StatusBar)`
  ${Utilities.getStyleString(Constants.status, Constants.app)}
`;

const firebaseConfig = {
  apiKey: "AIzaSyDhI9Dd3Qg9eZRhBx9kQsWefHdS529V-98",
  authDomain: "mealstogo-46bd5.firebaseapp.com",
  projectId: "mealstogo-46bd5",
  storageBucket: "mealstogo-46bd5.appspot.com",
  messagingSenderId: "414961067941",
  appId: "1:414961067941:web:c07158ef9931378e6fea4c",
  measurementId: "G-WSGGEMD0CW",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//const analytics = getAnalytics(app);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <Status />
    </>
  );
}
