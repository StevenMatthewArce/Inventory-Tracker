import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Segment,
  Header,
  Icon,
  Divider,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import _ from "lodash";

const testData = [
  {
    id: "0",
    date: "03/30/2021",
    type: "Receipt",
    item: "Test",
    total: "100",
    comments: "no comment"
  },
  {
    id: "1",
    date: "03/31/2020",
    type: "Receipt",
    item: "Test2",
    total: "2",
    comments: "no comment2"
  },
  {
    id: "1",
    date: "04/1/2021",
    type: "Item",
    item: "Test3",
    total: "200",
    comments: "no comment3"
  }
];

export class Expense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [...testData],
      column: null,
      direction: null
    };
  }

  handleDateSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }

    this.setState({
      data: data.slice().reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleSort = clickColumn => () => {
    const { column, data, direction } = this.state;
  };

  render() {
    const { data, column, direction } = this.state;
    return (
      <div style={{ height: "100vh" }}>
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
                  onClick={this.handleDateSort("Date")}
                >
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "Type" ? direction : null}
                  onClick={this.handleDateSort("Type")}
                >
                  Type
                </Table.HeaderCell>
                <Table.HeaderCell width={3}>Item</Table.HeaderCell>
                <Table.HeaderCell width={6}>Comments</Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "Total" ? direction : null}
                  onClick={this.handleDateSort("Total")}
                >
                  Total
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {console.log(this.state)}

            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.id}>
                    <Table.Cell textAlign="center">{items.date}</Table.Cell>
                    <Table.Cell textAlign="center">{items.type}</Table.Cell>
                    <Table.Cell textAlign="center">{items.item}</Table.Cell>
                    <Table.Cell>{items.comments}</Table.Cell>
                    <Table.Cell textAlign="center">${items.total}</Table.Cell>
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
