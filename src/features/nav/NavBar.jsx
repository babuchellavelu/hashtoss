import React, { useState } from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import SignedOutPage from "./SignedOutPage";
import SignedInPage from "./SignedInPage";

export default function NavBar({ setFormOpen }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignout() {
    setAuthenticated(false);
    history.push("/");
  }

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: 15 }}
            className="imgcls"
          />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Events" />
        <Menu.Item as={NavLink} to="/sandbox" name="Sandbox" />
        {authenticated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button positive inverted content="Create Events" />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInPage signout={handleSignout} />
        ) : (
          <SignedOutPage setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
}
