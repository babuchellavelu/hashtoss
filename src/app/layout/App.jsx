import React from "react";
import { Route } from "react-router";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/eventDashboard";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";

function App() {
  // const [formOpen, setFormOpen] = useState(false);

  // const [selectedEvent, setSelectedEvent] = useState(null);

  // function handleCreateFormOpen() {
  //   setSelectedEvent(null);
  //   setFormOpen(true);
  // }

  // function handleSelectEvent(event) {
  //   setSelectedEvent(event);
  //   setFormOpen(true);
  // }

  //  <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} selectedEvent={selectedEvent} selectEvent={handleSelectEvent} />

  return (
    <>
      <Route path="/" exact component={HomePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route path="/events" exact component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
