import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.names.body};
  font-weight: ${theme.fonts.weights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fonts.sizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fonts.sizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fonts.sizes.caption};
    font-weight: ${theme.fonts.weights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.names.heading};
    font-size: ${theme.fonts.sizes.body};
    font-weight: ${theme.fonts.weights.medium};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
