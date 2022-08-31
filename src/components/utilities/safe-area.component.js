import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import Utilities from "../../utils/Utilities";
import * as Constants from "../../Constants/Constants";

export const Container = styled(SafeAreaView)`
  ${Utilities.getStyleString(Constants.container, Constants.restaurantsScreen)}
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
