import React, { useContext } from "react";
import { Tab, Segment } from "semantic-ui-react";
import { RawMaterials, FinishedGoods, Recipes } from "../Inventory";
import { AuthContext } from "../App/Auth";
import { Link, Redirect } from "react-router-dom";

const panes = currentUser => [
  {
    menuItem: "Raw Materials",
    render: () => (
      <Tab.Pane attached={false}>
        <RawMaterials uid={currentUser.uid} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Finished Goods",
    render: () => (
      <Tab.Pane attached={false}>
        <FinishedGoods uid={currentUser.uid} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Recipes",
    render: () => (
      <Tab.Pane attached={false}>
        <Recipes uid={currentUser.uid} />
      </Tab.Pane>
    )
  }
];

const Inventory = () => {
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

export default Inventory;
