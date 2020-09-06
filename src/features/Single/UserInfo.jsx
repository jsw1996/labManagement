import React from "react";
import {
  Container,
  List,
  Divider,
  Header,
  Item,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function UserInfo({ profile }) {
  return (
    <Container>
      <List>
        <List.Item>
          <Header size='large'>
            Name: {profile.name}
            <Button
              floated='right'
              content='Manage'
              color='instagram'
              as={Link}
              to={`/manage/${profile.id}`}
            ></Button>
          </Header>
        </List.Item>
        <List.Item>
          <Header size='medium'>Year: {profile.year}</Header>
        </List.Item>
        <List.Item>Current Project: {profile.project}</List.Item>
        <List.Item>
          Team Leader:
          <Item as='a'> {profile.teamLeader}</Item>
        </List.Item>
      </List>
      <Divider />
      <Container>
        <p>{profile.description}</p>
      </Container>
    </Container>
  );
}
