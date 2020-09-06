import React from "react";
import { Segment, Container, Header, Image, Button, Icon } from "semantic-ui-react";

export default function Homepage({history}) {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Image fluid src='https://uwseal.org/wp-content/uploads/2020/05/Logo-Simple-Color-updated.png'/>
          SUDOKU Proj.
        </Header>
        <Button onClick={() => history.push('/members')} size='huge' inverted>
            Get Started
            <Icon name='arrow right' inverted />
        </Button>
      </Container>
    </Segment>
  );
}
