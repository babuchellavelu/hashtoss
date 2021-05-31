import React from "react";
import { Grid, Sidebar } from "semantic-ui-react";
import EventListItem from "./EventListItem";

export default function EventList({ events }) {
  return (
    <Grid stackable>
      {events.map((event, index) => (
        <Grid.Column width={16} key={index}>
          <EventListItem event={event} key={event.id} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
