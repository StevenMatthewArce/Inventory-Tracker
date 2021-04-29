import React from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/index";

const Sidenav = props => {
  return (
    <Sidebar
      as={Menu}
      animation="slide along"
      direction="left"
      icon="labeled"
      inverted
      vertical
      visible={props.toggleMenu}
      width="thin"
    >
      <Menu.Item as={Link} to="/">
        <Icon name="server" />
        Dashboard
      </Menu.Item>
      <Menu.Item as={Link} to="/inventory">
        <Icon name="boxes" />
        Inventory
      </Menu.Item>
      <Menu.Item as={Link} to="/orders">
        <Icon name="tasks" />
        Orders
      </Menu.Item>
      <Menu.Item as={Link} to="/budget">
        <Icon name="sticky note" />
        Budget
      </Menu.Item>
      <Menu.Item onClick={() => auth.signOut()}>
        <Icon name="sign out" />
        Sign Out
      </Menu.Item>
    </Sidebar>
  );
};

export default Sidenav;
