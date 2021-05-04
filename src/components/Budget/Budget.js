import React, { useContext, useState } from "react";
import { Tab, Segment } from "semantic-ui-react";
import { Expense, Sales } from "../Budget";
import { AuthContext } from "../App/Auth";
import { Redirect } from "react-router-dom";

const panes = currentUser => [
  {
    menuItem: "Expense",
    render: () => (
      <Tab.Pane attached={false}>
        <Expense uid={currentUser.uid} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Sales",
    render: () => (
      <Tab.Pane attached={false}>
        <Sales uid={currentUser.uid} />
      </Tab.Pane>
    )
  }
];

const Budget = () => {
  const { currentUser } = useContext(AuthContext);
  // const [totalSaleMonth, setTotalSaleMonth] = useState(0);
  // const [totalSaleYear, setTotalSaleYear] = useState(0);
  // const [saleMonthPercentage, setSaleMonthPercentage] = useState(0);
  // const [mostPopularItem, setMostPopularItem] = useState(null);

  // const handleSaleData = (
  //   totalSaleMonth,
  //   totalSaleYear,
  //   saleMonthPercentage,
  //   mostPopularItem
  // ) => {
  //   setTotalSaleMonth(totalSaleMonth);
  //   setTotalSaleYear(totalSaleYear);
  //   setSaleMonthPercentage(saleMonthPercentage);
  //   setMostPopularItem(mostPopularItem);
  // };

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Segment style={{ height: "90vh" }}>
      <Tab panes={panes(currentUser)} />
    </Segment>
  );
};

export default Budget;
