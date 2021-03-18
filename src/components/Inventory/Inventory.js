import React from "react";

import { Button, Tab } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import { RawMaterials, FinishedGoods, Recipes } from "../Inventory";

const panes = [
  {
    menuItem: "Raw Inventory",
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
    <div style={{ height: '100vh' }}>
      <Button 
        content='Add Item' 
        icon='plus square outline'
        labelPosition='right' 
        as={Link}
        to='/addItem'
      />
      <Tab menu={{ secondary: true, color: 'black', pointing: true }} panes={panes} />
    </div>
  )
}

export default Inventory;
