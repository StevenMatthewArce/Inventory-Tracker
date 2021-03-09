import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import {
  Raw,
  FinishedGoods,
  Recipes
} from "../components/Inventory_Components";

const panes = [
  {
    menuItem: "Raw Inventory",
    render: () => (
      <Tab.Pane>
        <Raw />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Finished Goods",
    render: () => (
      <Tab.Pane>
        <FinishedGoods />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Recipes",
    render: () => (
      <Tab.Pane>
        <Recipes />
      </Tab.Pane>
    )
  }
];

class Inventory extends Component {
  render() {
    return (
      <Tab
        menu={{ color: "black", inverted: true, pointing: true }}
        panes={panes}
      />
    );
  }
}

export default Inventory;
