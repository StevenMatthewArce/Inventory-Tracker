import React from "react";
import { Tab, Segment } from "semantic-ui-react";
import { Expense, Sales } from "../Budget";

const panes = [
  {
    menuItem: "Expense",
    render: () => (
      <Tab.Pane attached={false}>
        <Expense />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Sales",
    render: () => (
      <Tab.Pane attached={false}>
        <Sales />
      </Tab.Pane>
    )
  }
];

const Budget = () => {
  return (
    <Segment style={{ height: "90vh" }}>
      <Tab panes={panes} />
    </Segment>
  );
};

export default Budget;
