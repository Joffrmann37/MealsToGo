import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { emailValidated } from "../../../components/utilities/email-validator";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  RegisterLogo,
} from "../components/account-styles";
import { Spacer } from "../../../components/spacer/spacer.component";

import { AuthenticationContext } from "../../../services/authentication/authentication-context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [editedField, setEditedField] = useState("");
  const [inlineError, setInlineError] = useState("");
  const { onRegister, isAuthenticated, isLoading, error } = useContext(
    AuthenticationContext
  );

  const registerPressed = async () => {
    await onRegister(email, password, confirmedPassword);
    if (isAuthenticated) {
      navigation.navigate("RestaurantsScreen");
    }
  };

  useEffect(() => {
    if (
      email.length === 0 &&
      password.length === 0 &&
      confirmedPassword.length === 0
    ) {
      setInlineError("");
      return;
    } else if (editedField === "email") {
      setInlineError(!emailValidated(email) ? "Your e-mail is invalid." : "");
    } else if (password.length < 6 && editedField === "password") {
      setInlineError("Your password must be a minimum of 6 characters.");
    } else if (
      password !== confirmedPassword &&
      editedField === "confirmPassword"
    ) {
      setInlineError("Your password and confirmed password must match");
    } else {
      setInlineError("");
    }
  }, [email, password, confirmedPassword, editedField]);

  return (
    <AccountBackground>
      <AccountCover />
      <RegisterLogo />
      <AccountContainer>
        <AuthInput
          label="E-mail"
          defaultValue={email}
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
        <Spacer size="small">
          <AuthInput
            label="Confirm Password"
            value={confirmedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => {
              setConfirmedPassword(p);
              setEditedField("confirmPassword");
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
              icon="email"
              mode="contained"
              disabled={
                email.length < 5 ||
                password.length < 5 ||
                password !== confirmedPassword
              }
              onPress={() =>
                registerPressed(email, password, confirmedPassword)
              }
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="small">
        <AuthButton
          mode="contained"
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
