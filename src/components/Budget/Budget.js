import React from "react";

import { Button, Tab } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import { Expense } from "../Budget";

const panes = [
  {
    menuItem: "Expense",
    render: () => (
      <Tab.Pane>
        <Expense/>
      </Tab.Pane>
    )
  }
];

const Budget = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Button 
        content='Add Item' 
        icon='plus square outline'
        labelPosition='right' 
        as={Link}
        to='/addItem'
      />
      <Tab menu={{ color: 'black', pointing: true }} panes={panes} />
    </div>
  )
}

export default Budget;
