import React, { useContext } from "react";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Container } from "../../../components/utilities/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication-context";

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
  return <List.Icon {...props} color="black" icon="heart" />;
};

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <Container>
      <AvatarContainer>
        <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
        <Spacer position="top" size="small">
          <Text variant="label">
            {user.user.email.charAt(0).toUpperCase() + user.user.email.slice(1)}
          </Text>
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
