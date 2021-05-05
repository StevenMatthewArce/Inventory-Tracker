import React, { useContext } from "react";
import { Tab, Segment } from "semantic-ui-react";
import { CurrentOrders, CompletedOrders } from "../Orders";
import { AuthContext } from "../App/Auth";
import { Redirect } from "react-router-dom";

const panes = currentUser => [
  {
    menuItem: "Current Orders",
    render: () => (
      <Tab.Pane >
        <CurrentOrders uid={currentUser.uid} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Completed Orders",
    render: () => (
      <Tab.Pane >
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
    <Segment style={{ height: "90vh",  backgroundColor: "#f1f1f1"  }}>
      <Tab  style= {{color:"#36393e"}} panes={panes(currentUser)} />
    </Segment>
  );
};

export default Orders;
