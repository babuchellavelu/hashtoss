import React from "react";
import { Route, useLocation } from "react-router";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/events/eventDashboard/eventDashboard";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";

function App() {
  const { key } = useLocation();
  return (
    <>
      <ModalManager />
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route path="/events" exact component={EventDashboard} />
              <Route path="/sandbox" component={Sandbox} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                key={key}
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
