import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutFirebase } from "../../app/firestore/firebaseService";

export default function SignedInMenu() {
  const { currentUser } = useSelector((state) => state.auth);

  const history = useHistory();

  async function handleSignOut() {
    try {
      await signOutFirebase();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUser?.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing="top left" text={currentUser?.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            text="My Account"
            icon="settings"
            as={Link}
            to="/account"
          />
          <Dropdown.Item onClick={handleSignOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
