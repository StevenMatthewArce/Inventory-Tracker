import React, { useContext } from "react";
import { Tab, Segment } from "semantic-ui-react";
import { CurrentOrders, CompletedOrders } from "../Orders";
import { AuthContext } from "../App/Auth";
import { Redirect } from "react-router-dom";

const panes = currentUser => [
  {
    menuItem: "Current Orders",
    render: () => (
      <Tab.Pane attached={false}>
        <CurrentOrders uid={currentUser.uid} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Completed Orders",
    render: () => (
      <Tab.Pane attached={false}>
        <CompletedOrders uid={currentUser.uid} />
      </Tab.Pane>
    )
  }
];

const Orders = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Segment style={{ height: "90vh" }}>
      <Tab panes={panes(currentUser)} />
    </Segment>
  );
};

export default Orders;
