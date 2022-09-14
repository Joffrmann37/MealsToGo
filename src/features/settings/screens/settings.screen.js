import React, { useContext, useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { List, Avatar } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication-context";
import { Container } from "../../../components/utilities/safe-area.component";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.spacing.sizes.small};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

const FavoritesListIcon = ({ props }) => {
  return <List.Icon {...props} color="black" icon="heart" />;
};

const LogoutListIcon = ({ props }) => {
  return <List.Icon {...props} color="black" icon="door" />;
};

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <Container>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!photo && (
            <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          )}
          {photo && (
            <Avatar.Image
              size={180}
              source={{ uri: photo }}
              backgroundColor="#2182BD"
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          title="Favorites"
          description="View your favorites"
          left={(props) => FavoritesListIcon(props)}
          onPress={() => navigation.navigate("Favorites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => LogoutListIcon(props)}
          onPress={onLogout}
        />
      </List.Section>
    </Container>
  );
};
