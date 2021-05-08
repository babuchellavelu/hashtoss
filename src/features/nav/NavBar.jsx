import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar() {
  const { authendicated } = useSelector((state) => state.auth);

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
        {authendicated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button positive inverted content="Create Events" />
          </Menu.Item>
        )}

        {authendicated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
