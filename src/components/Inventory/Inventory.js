import React from "react";

import { Tab } from "semantic-ui-react";
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
    <div style={{ height: "100vh" }}>
      <Tab panes={panes} />
    </div>
  );
};

export default Inventory;
