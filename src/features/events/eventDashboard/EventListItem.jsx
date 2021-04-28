import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EveltListAttendee";

export default function EventListItem({ event, selectEvent, deleteEvent }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>{event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {event.date}
          <Icon name="marker" /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee attendee={attendee} key={attendee.id} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          color="red"
          floated="right"
          content="delete"
          onClick={() => deleteEvent(event.id)}
        />
        <Button
          color="teal"
          floated="right"
          content="view"
          //   onClick={() => selectEvent(event)}
          as={Link}
          to={`/events/${event.id}`}
        />
      </Segment>
    </Segment.Group>
  );
}
