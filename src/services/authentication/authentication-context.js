import React, { useState, createContext, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/compat/firestore";
import { loginRequest } from "./authentication-service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onLoginCheck();
  }, [isAuthenticated, error, user]);

  const onLogin = (email, password) => {
    setIsLoading(false);
    loginRequest(email, password)
      .then((retrievedUser) => {
        if (retrievedUser) {
          setUser(retrievedUser);
          setIsLoading(false);
          setIsAuthenticated(true);
          storeData(retrievedUser);
        }
      })
      .then((u) => {})
      .catch((err) => {
        setError(err.toString().replace("FirebaseError: Firebase: ", ""));
        setIsLoading(false);
        setIsAuthenticated(false);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((retrievedUser) => {
        if (retrievedUser) {
          setUser(retrievedUser);
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      })
      .then((u) => {})
      .catch((err) => {
        setError(err.toString().replace("FirebaseError: Firebase: ", ""));
        setIsLoading(false);
      });
  };

  const storeData = async (u) => {
    try {
      await AsyncStorage.setItem("currentUser", JSON.stringify(u));
    } catch (error) {
      // Error saving data
    }
  };

  const onLoginCheck = async () => {
    const value = await AsyncStorage.getItem("currentUser");
    if (value !== null) {
      // We have data!!
      setUser(JSON.parse(value));
      setIsAuthenticated(true);
    }
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
        setIsAuthenticated(false);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        onLogin,
        onLoginCheck,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
