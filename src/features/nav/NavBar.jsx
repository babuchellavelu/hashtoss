import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutPage from "./SignedOutPage";
import SignedInPage from "./SignedInPage";
import { useSelector } from "react-redux";

export default function NavBar({ setFormOpen }) {
  const authenticated = useSelector((state) => state.auth);
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

        {authenticated ? <SignedInPage /> : <SignedOutPage />}
      </Container>
    </Menu>
  );
}
