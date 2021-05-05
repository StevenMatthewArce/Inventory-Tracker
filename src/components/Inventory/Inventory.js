import React, { useContext } from "react";
import { Tab, Segment } from "semantic-ui-react";
import { RawMaterials, FinishedGoods, Recipes } from "../Inventory";
import { AuthContext } from "../App/Auth";
import { Redirect } from "react-router-dom";

const panes = currentUser => [
  {
    menuItem: "Raw Materials",
    render: () => (
      <Tab.Pane >
        <RawMaterials uid={currentUser.uid} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Finished Goods",
    render: () => (
      <Tab.Pane >
        <FinishedGoods uid={currentUser.uid} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Recipes",
    render: () => (
      <Tab.Pane>
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
    <Segment style={{ height: "90vh", backgroundColor: "#f1f1f1" }}>
      <Tab style= {{color:"#36393e"}}panes={panes(currentUser)} />
    </Segment>
  );
};

export default Inventory;
