import React from "react";
import { Card, Image, Divider } from "semantic-ui-react";
import { format } from "date-fns";

export default function UserInfo({ profile }) {
  return (
    <Card>
      <Image fluid src={profile.image} />
      <Card.Content>
        <Card.Header>{profile.name}</Card.Header>
        <Divider />
        {/* <Card.Meta>Since:{format(profile.since, "MMMM d, yyyy")}</Card.Meta> */}
      </Card.Content>
    </Card>
  );
}
