import React, { useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import EventListItemPlaceholder from "./EventItemPlaceholder";
import EventFilters from "./EventFilters";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router";

import Carousal from "../../carousal/Carousal";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.objEventReducer);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);

  /* Filter Code Declaration - Start  (Multiple filed Filter)
    const [pridicate, setPridicate] = useState(
    new Map([
      ["startdate", new Date()],
      ["filter", "all"],
    ])
  );
  */
  const [predicate, setPredicate] = useState(
    new Map([
      ["startdate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }
  /* Filter Code Declaration- End*/

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch.predicate],
  });

  if (loading || (!events && !error))
    return <LoadingComponent content="Loading Event ...." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      {/* <Grid.Row>
        <Grid.Column width={8}>
          <EventFilters
            predicate={predicate}
            setPredicate={handleSetPredicate}
            loading={loading}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Carousal />
        </Grid.Column>
      </Grid.Row> */}
      <Grid.Column width={4} fixed>
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
      <Grid.Column width={8}>
        {loading && (
          <>
            <EventListItemPlaceholder />
          </>
        )}

        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={4} fixed>
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  );
}
