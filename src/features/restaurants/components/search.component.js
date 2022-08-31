import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { View } from "react-native";
import * as Constants from "../../../Constants/Constants";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.spacing.sizes.small};
`;

export const Search = ({ isFavoritesToggled, onFavoritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer>
      <Searchbar
        icon={isFavoritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavoritesToggle}
        placeholder={Constants.searchPlaceholder}
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
