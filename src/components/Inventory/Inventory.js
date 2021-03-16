import React from "react";

import { Button, Tab } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import { RawMaterials, FinishedGoods, Recipes } from "../Inventory";

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

const Inventory = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Button 
        content='Add Item' 
        icon='plus square outline'
        labelPosition='right' 
        as={Link}
        to='/addItem'
      />
      <Tab menu={{ color: 'black' }} panes={panes} />
    </div>
  )
}

export default Inventory;
