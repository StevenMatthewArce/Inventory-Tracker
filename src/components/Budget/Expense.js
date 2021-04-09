import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Progress,
  Statistic
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _ from "lodash";

//TODO: Add Expense Chart-Bar at the top
//TODO: Add Filters
//TODO: Add Selectable Rows

export class Expense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      column: null,
      direction: null,
      totalExpenseMonth: null,
      totalExpenseYear: null,
      totalSalesYear: null,
      expenseMonthPercentage: null,
      expenseYearPercentage: null
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("receipts")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .then(() => this.setState({ data: documents }))
      .then(() => this.calculateExpenseMonth());

    this.calculateExpenseYear();
  }

  //TODO: Add sorting alg
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }

    direction === "ascending"
      ? this.setState({
          data: data.sort((a, b) =>
            a.clickedColumn < b.clickedColumn ? 1 : -1
          ),
          direction: direction === "ascending" ? "descending" : "ascending"
        })
      : this.setState({
          data: data.sort((a, b) =>
            a.clickedColumn < b.clickedColumn ? 1 : -1
          ),
          direction: direction === "ascending" ? "descending" : "ascending"
        });
  };

  calculateExpenseMonth = () => {
    //TODO: Add code to calculate monlth expenses

    //! This is only for testing
    let totalExpenseMonth = "1652";
    let totalExpenseYear = "10000";
    this.setState(
      {
        totalExpenseMonth: totalExpenseMonth,
        totalExpenseYear: totalExpenseYear
      },
      console.log(this.state)
    );

    let expenseMonthPercentage = (totalExpenseMonth / totalExpenseYear) * 100;
    this.setState({ expenseMonthPercentage: expenseMonthPercentage });
  };

  calculateExpenseYear = () => {
    //TODO: Add code to calculate monthly expenses

    //! This is only for testing
    let totalSalesYear = "90000";
    this.setState(
      {
        totalSalesYear: totalSalesYear
      },
      console.log(this.state)
    );

    let expenseYearPercentage =
      (this.state.totalExpenseYear / totalSalesYear) * 100;
    this.setState({ expenseYearPercentage: expenseYearPercentage });
  };

  render() {
    const { data, column, direction } = this.state;
    console.log(this.state.data);
    return (
      <div style={{ height: "100vh" }}>
        <div>
          <Grid centered columns={2}>
            <Grid.Column>
              <Grid.Row verticalAlign="top">
                <Statistic
                  size="mini"
                  color="orange"
                  value={this.state.totalExpenseMonth}
                  label="Total Expense This Month"
                />

                <Statistic
                  floated="right"
                  size="mini"
                  color="grey"
                  value={this.state.totalExpenseYear}
                  label="Total Expense This Year"
                />
              </Grid.Row>

              <Grid.Row verticalAlign="bottom">
                <Progress
                  color="orange"
                  percent={this.state.expenseMonthPercentage}
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row verticalAlign="top">
                <Statistic
                  size="mini"
                  color="olive"
                  value={this.state.totalExpenseYear}
                  label="Total Expense This Year"
                />

                <Statistic
                  floated="right"
                  size="mini"
                  color="grey"
                  value={this.state.totalSalesYear}
                  label="Total Sales"
                />
              </Grid.Row>

              <Grid.Row verticalAlign="bottom">
                <Progress
                  color="olive"
                  percent={this.state.expenseYearPercentage}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
        <div>
          <Grid columns="equal">
            <Grid.Column width={12}>
              <Header as="h1">Expense Tracking</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Dropdown
                text="Add"
                icon="plus square outline"
                labeled
                button
                className="icon"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="tasks"
                    iconPosition="left"
                    text="Receipts"
                    as={Link}
                    to="/addReceipt"
                  />
                  <Dropdown.Item
                    icon="tags"
                    iconPosition="left"
                    text="Items"
                    as={Link}
                    to="/addItem"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid>
        </div>
        <Divider />
        <div>
          <Table sortable celled>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell
                  width={1}
                  sorted={column === "Date" ? direction : null}
                  onClick={this.handleSort("Date")}
                >
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "Type" ? direction : null}
                  onClick={this.handleSort("Type")}
                >
                  Type
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={3}
                  sorted={column === "store" ? direction : null}
                  onClick={this.handleSort("store")}
                >
                  Store
                </Table.HeaderCell>
                <Table.HeaderCell width={6}>Description</Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "totalCost" ? direction : null}
                  onClick={this.handleSort("totalCost")}
                >
                  Total
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.id}>
                    <Table.Cell textAlign="center">{items.date}</Table.Cell>
                    <Table.Cell textAlign="center">{items.type}</Table.Cell>
                    <Table.Cell textAlign="center">{items.store}</Table.Cell>
                    <Table.Cell>{items.description}</Table.Cell>
                    <Table.Cell textAlign="center">
                      ${items.totalCost}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
        </div>
      </div>
    );
  }
}

export default Expense;
