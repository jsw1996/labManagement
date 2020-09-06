import React from "react";
import {
  Grid,
  Segment,
  Item,
  Header,
  Statistic,
  Divider,
  Reveal,
  Button,
} from "semantic-ui-react";

export default function UserHeader({user}) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={user.photoURL || 'https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: "block", marginBottom: 10 }}
                  content={user.displayName || 'Not working'}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={10} />
            <Statistic label='Following' value={5} />
          </Statistic.Group>
          <Divider />
          <Reveal animated='move'>
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color='teal' content='Following' />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button fluid color='red' content='Unfollow' />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
