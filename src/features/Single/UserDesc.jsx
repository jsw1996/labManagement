import React from "react";
import { Container, Header, Icon, List } from "semantic-ui-react";

export default function UserInfo({ profile }) {
  return (
    <Container>
      <Header textAlign='center'>Information</Header>

      <List divided relaxed>
        <List.Item>Specialization: {profile.spec}</List.Item>
        <List.Item>Position: {profile.position}</List.Item>
      </List>
      <Container textAlign='center'>
        <Icon circular name='facebook' />
        <Icon circular name='mail' />
        <Icon circular name='google' />
      </Container>
    </Container>
  );
}
