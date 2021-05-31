import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Icon,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import EventListAttendee from "./EveltListAttendee";
import { format } from "date-fns";
import { deleteEventFromFirestore } from "../../../app/firestore/firestoreService";

export default function EventListItem({ event }) {
  return (
    <Card.Group>
      <Card
        as={Link}
        to={`/events/${event.id}`}
        key={event?.id}
        image={event?.imageURL}
        header={event?.title}
        fluid
        meta={format(event?.date, "MMMM d, yyyy h:mm a")}
        description={event?.description}
      />
      <Button
        as={Link}
        to={`/manage/${event?.id}`}
        color="orange"
        floated="right"
      >
        Edit News
      </Button>
    </Card.Group>

    // <Segment.Group>
    //   <Segment>
    //     <Item.Group>
    //       <Item>
    //         <Item.Image size="medium" circular src={event.hostPhotoURL} />
    //       </Item>
    //       <Item>
    //         <Item.Content>
    //           <Item.Header content={event.title} />
    //           <Item.Description>
    //             Hosted by
    //             <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
    //           </Item.Description>
    //           {event.isCancelled && (
    //             <Label
    //               style={{ top: "-40px" }}
    //               ribbon="right"
    //               color="red"
    //               content="This event has been cancelled"
    //             />
    //           )}
    //         </Item.Content>
    //       </Item>
    //     </Item.Group>
    //   </Segment>
    //   <Segment>
    //     <span>
    //       <Icon name="clock" /> {format(event.date, "MMMM d, yyyy h:mm a")}
    //       <Icon name="marker" /> {event.venue}
    //     </span>
    //   </Segment>
    //   <Segment secondary>
    //     <List horizontal>
    //       {event.attendees.map((attendee) => (
    //         <EventListAttendee attendee={attendee} key={attendee.id} />
    //       ))}
    //     </List>
    //   </Segment>
    //   <Segment clearing>
    //     <div>{event.description}</div>
    //     <Button
    //       color="red"
    //       floated="right"
    //       content="delete"
    //       onClick={() => deleteEventFromFirestore(event.id)}
    //     />
    //     <Button
    //       color="teal"
    //       floated="right"
    //       content="view"
    //       //   onClick={() => selectEvent(event)}
    //       as={Link}
    //       to={`/events/${event.id}`}
    //     />
    //   </Segment>
    // </Segment.Group>
  );
}
