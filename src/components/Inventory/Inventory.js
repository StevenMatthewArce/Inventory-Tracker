import React from "react";
import { Tab, Segment } from "semantic-ui-react";
import { RawMaterials, FinishedGoods, Recipes } from "../Inventory";

const panes = [
  {
    menuItem: "Raw Materials",
    render: () => (
      <Tab.Pane attached={false}>
        <RawMaterials />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Finished Goods",
    render: () => (
      <Tab.Pane attached={false}>
        <FinishedGoods />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Recipes",
    render: () => (
      <Tab.Pane attached={false}>
        <Recipes />
      </Tab.Pane>
    )
  }
];

const Inventory = () => {
  return (
    <Segment style={{ height: "100vh" }}>
      <Tab panes={panes} />
    </Segment>
  );
};

export default Inventory;
