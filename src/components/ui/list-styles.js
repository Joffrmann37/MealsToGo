import styled from "styled-components/native";

export const ItemImage = styled.Image`
  width: ${(props) => props.theme.sizes.large};
  height: ${(props) => props.theme.sizes.large};
  resize-mode: contain;
  margin: 5px;
`;

export const ListStyles = {
  ItemImage,
};
