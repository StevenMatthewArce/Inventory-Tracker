import React from "react";
import { Tab } from "semantic-ui-react";
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
    <div style={{ height: "100vh" }}>
      <Tab panes={panes} />
    </div>
  );
};

export default Budget;
