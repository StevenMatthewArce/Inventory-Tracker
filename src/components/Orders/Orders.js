import React from "react";
import { Tab } from "semantic-ui-react";
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
    <div style={{ height: "100vh" }}>
      <Tab panes={panes} />
    </div>
  );
};

export default Orders;
