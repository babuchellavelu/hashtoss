import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

export default function EventDetailedPage({ match }) {
  const selected_event = useSelector((state) =>
    state.objEventReducer.events.find((e) => e.id === match.params.id)
  );
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={selected_event} />
        <EventDetailedInfo event={selected_event} />
        <EventDetailedChat event={selected_event} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={selected_event.attendees} />
      </Grid.Column>
    </Grid>
  );
}
