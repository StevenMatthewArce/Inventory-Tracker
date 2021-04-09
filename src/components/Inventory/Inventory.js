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
      </div>
     )  
     
  }
];

const Inventory = ({menuItem}) => {
  //<Tab menu={{ secondary: true, color: 'black', pointing: true }} panes={panes} />
  if (menuItem === "Recipes"){
      return( 
      <div style={{ height: '100vh' }}>
      <Button 
        content='Add Recipe' 
        icon='plus square outline'
        labelPosition='right' 
        as={Link}
        to='/addRecipe'
      />
      <Tab.Pane attached={false}> 
        <Recipes />
      </Tab.Pane>
      <Tab menu={{ secondary: true, color: 'black', pointing: true }} panes={panes} />
      </div>
      )
  }
   else { //(panes.menuItem === "Raw Inventory"){

  
  return (
    <div style={{ height: "100vh" }}>
      <Tab panes={panes} />
    </div>
  );
};

export default Inventory;
