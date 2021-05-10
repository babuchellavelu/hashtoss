import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToEvents } from "../eventActions";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router";

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const selected_event = useSelector((state) =>
    state.objEventReducer.events.find((e) => e.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

  const isHost = selected_event?.hostUid === currentUser?.uid;
  const isGoing = selected_event?.attendees.some(
    (a) => a.id === currentUser?.uid
  );

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (selected_event) => dispatch(listenToEvents([selected_event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!selected_event && !error))
    return <LoadingComponent content="Loading Event ...." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={selected_event}
          isHost={isHost}
          isGoing={isGoing}
        />
        <EventDetailedInfo
          event={selected_event}
          isHost={isHost}
          isGoing={isGoing}
        />
        <EventDetailedChat event={selected_event} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar
          attendees={selected_event?.attendees}
          hostUid={selected_event?.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
}
