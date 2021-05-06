import React, { useContext, useState } from "react";
import { Tab, Segment } from "semantic-ui-react";
import { Expense, Sales } from "../Budget";
import { AuthContext } from "../App/Auth";
import { Redirect } from "react-router-dom";

const panes = (currentUser, salesInfo, handleExpenseData, handleSaleData) => [
  {
    menuItem: "Expense",
    render: () => (
      <Tab.Pane>
        <Expense uid={currentUser.uid} handleExpenseData={handleExpenseData} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Sales",
    render: () => (
      <Tab.Pane >
        <Sales
          uid={currentUser.uid}
          totalExpenseMonth={salesInfo.totalExpenseMonth}
          totalExpenseYear={salesInfo.totalExpenseYear}
          expenseMonthPercentage={salesInfo.expenseMonthPercentage}
          handleSaleData={handleSaleData}
        />
      </Tab.Pane>
    )
  }
];

const Budget = () => {
  const { currentUser } = useContext(AuthContext);
  const [totalSaleMonth, setTotalSaleMonth] = useState(0);
  const [totalSaleYear, setTotalSaleYear] = useState(0);
  const [saleMonthPercentage, setSaleMonthPercentage] = useState(0);
  const [mostPopularItem, setMostPopularItem] = useState(null);
  const [totalExpenseMonth, setTotalExpenseMonth] = useState(0);
  const [totalExpenseYear, setTotalExpenseYear] = useState(0);
  const [expenseMonthPercentage, setExpenseMonthPercentage] = useState(0);

  const handleSaleData = (
    totalSaleMonth,
    totalSaleYear,
    saleMonthPercentage,
    mostPopularItem
  ) => {
    setTotalSaleMonth(totalSaleMonth);
    setTotalSaleYear(totalSaleYear);
    setSaleMonthPercentage(saleMonthPercentage);
    setMostPopularItem(mostPopularItem);
  };

  const handleExpenseData = (
    totalExpenseMonth,
    totalExpenseYear,
    expenseMonthPercentage
  ) => {
    setTotalExpenseMonth(totalExpenseMonth);
    setTotalExpenseYear(totalExpenseYear);
    setExpenseMonthPercentage(expenseMonthPercentage);
  };

  const salesInfo = {
    totalSaleMonth: totalSaleMonth,
    totalSaleYear: totalSaleYear,
    saleMonthPercentage: saleMonthPercentage,
    mostPopularItem: mostPopularItem,
    totalExpenseMonth: totalExpenseMonth,
    totalExpenseYear: totalExpenseYear,
    expenseMonthPercentage: expenseMonthPercentage
  };

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Segment style={{ height: "100vh", backgroundColor: "#f1f1f1" }}>
      <Tab style= {{color:"#36393e"}}
        panes={panes(currentUser, salesInfo, handleExpenseData, handleSaleData)}
      />
    </Segment>
  );
};

export default Budget;
