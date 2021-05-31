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
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";
import Footer from "../../features/nav/Footer";
import MenuList from "../../features/nav/MenuList";

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content="Loading App..." />;

  return (
    <>
      <ModalManager />

      <NavBar />
      <Container className="main">
        <Route path="/" exact component={EventDashboard} />
        <Route path="/events" exact component={EventDashboard} />
        <Route path="/sandbox" component={Sandbox} />
        <Route path="/events/:id" component={EventDetailedPage} />
        <Route
          path={["/createEvent", "/manage/:id"]}
          key={key}
          component={EventForm}
        />
        <Route path="/account" component={AccountPage} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/error" component={ErrorComponent} />
        <Route path="/menu" component={MenuList} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
