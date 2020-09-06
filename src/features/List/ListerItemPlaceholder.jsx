import React from "react";
import { Placeholder, Card, Segment, Button } from "semantic-ui-react";

export default function ListerItemPlaceholder() {
  return (
    <Placeholder fluid>
      <Segment.Group>
        <Segment style={{ minHeight: 100 }}>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
        <Segment>
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        </Segment>
      </Segment.Group>
    </Placeholder>
  );
}
