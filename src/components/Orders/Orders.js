import React from "react";
import { Tab } from "semantic-ui-react";
import { Started, Finished } from "../Orders";

const panes = [
  {
    menuItem: "Current Orders",
    render: () => (
      <Tab.Pane attached={false}>
        <Started />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Completed Orders",
    render: () => (
      <Tab.Pane attached={false}>
        <Finished />
      </Tab.Pane>
    )
  }
];

const Orders = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Tab panes={panes} />
    </div>
  );
};

export default Orders;
