import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { emailValidated } from "../../../components/utilities/email-validator";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
  Logo,
} from "../components/account-styles";
import { Spacer } from "../../../components/spacer/spacer.component";

import { AuthenticationContext } from "../../../services/authentication/authentication-context";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editedField, setEditedField] = useState("");
  const [inlineError, setInlineError] = useState("");
  const { isAuthenticated, onLogin, isLoading, error } = useContext(
    AuthenticationContext
  );

  const loginPressed = async () => {
    await onLogin(email, password);
    if (isAuthenticated) {
      navigation.navigate("RestaurantsScreen");
    }
  };

  useEffect(() => {
    if (email.length === 0 && password.length === 0) {
      setInlineError("");
      return;
    } else if (editedField === "email") {
      setInlineError(!emailValidated(email) ? "Your e-mail is invalid." : "");
    } else if (password.length < 6 && editedField === "password") {
      setInlineError("Your password must be a minimum of 6 characters.");
    } else {
      setInlineError("");
    }
  }, [email, password, editedField, inlineError]);

  return (
    <AccountBackground>
      <AccountCover />
      <Logo />
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => {
            setEmail(u);
            setEditedField("email");
          }}
        />
        <Spacer size="small">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => {
              setPassword(p);
              setEditedField("password");
            }}
          />
        </Spacer>
        {error && (
          <Spacer size="small">
            <ErrorContainer>
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          </Spacer>
        )}
        {inlineError.length > 0 && (
          <Spacer size="small">
            <ErrorContainer>
              <Text variant="error">{inlineError}</Text>
            </ErrorContainer>
          </Spacer>
        )}
        <Spacer size="small">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              disabled={email.length < 5 || password.length < 5}
              onPress={() => {
                loginPressed(email, password);
              }}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="small">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
