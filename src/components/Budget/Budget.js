import React from "react";
import { Button, ButtonGroup, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Expense } from "../Budget";

const panes = [
  {
    menuItem: "Expense",
    render: () => (
      <Tab.Pane>
        <Expense />
      </Tab.Pane>
    )
  }
];

const Budget = () => {
  return (
    <div style={{ height: "100vh" }}>
      <ButtonGroup>
        <Button
          secondary
          content="Add Item"
          icon="plus square outline"
          labelPosition="right"
          as={Link}
          to="/addItem"
        />
        <Button
          secondary
          content="Add Receipt"
          icon="plus square outline"
          labelPosition="right"
          as={Link}
          to="/addReceipt"
        />
      </ButtonGroup>
      <Tab menu={{ color: "black", pointing: true }} panes={panes} />
    </div>
  );
};

export default Budget;
