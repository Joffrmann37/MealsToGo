import React from "react";
import styled, { useTheme } from "styled-components/native";

const getVariant = (position, size, theme) => {
  const property = theme.spacing.positions[position];
  const value =
    size !== null ? theme.spacing.sizes[size] : theme.spacing.sizes.small;
  return `${property}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant};
`;

export const Spacer = ({ position, children, size }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

Spacer.defaultProps = {
  position: "top",
};
