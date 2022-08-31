import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";

const SpinnerContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const SpinnerComponent = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const Spinner = (animating, size) => (
  <SpinnerContainer>
    <SpinnerComponent
      animating={animating}
      color={Colors.blue300}
      size={`${size}`}
    />
  </SpinnerContainer>
);
