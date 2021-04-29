import React from "react";
import { Tab, Segment } from "semantic-ui-react";
import { CurrentOrders, CompletedOrders } from "../Orders";

const panes = [
  {
    menuItem: "Current Orders",
    render: () => (
      <Tab.Pane attached={false}>
        <CurrentOrders />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Completed Orders",
    render: () => (
      <Tab.Pane attached={false}>
        <CompletedOrders />
      </Tab.Pane>
    )
  }
];

const Orders = () => {
  return (
    <Segment style={{ height: "90vh" }}>
      <Tab panes={panes} />
    </Segment>
  );
};

export default Orders;
