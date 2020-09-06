import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ListerItem({ profile }) {
  return (
    <Grid.Column>
      <Card
        centered
        link
        raised
        color='olive'
        as={Link}
        to={`/members/${profile.id}`}
      >
        <Image src={profile.photoURL} />
        <Card.Content content={profile.name}></Card.Content>
      </Card>
    </Grid.Column>
  );
}
