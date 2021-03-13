import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Tab } from "semantic-ui-react";
import { RawMaterials, FinishedGoods, Recipes } from "../components/InventoryComponents";

const panes = [
  {
    menuItem: "Raw Inventory",
    render: () => (
      <Tab.Pane>
        <RawMaterials />
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
      <div style={{ height: "100vh" }}>
        <Button
          content="Add Item"
          icon="plus square outline"
          labelPosition="right"
          as={Link}
          to="/addItem"
        />
        <Tab
          menu={{ color: "black", inverted: true, pointing: true }}
          panes={panes}
          defaultActiveIndex={0}
        />
      </div>
    );
  }
}

export default Inventory;
