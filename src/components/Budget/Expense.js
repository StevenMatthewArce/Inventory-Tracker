import React, { Component } from "react";
import { Table, Dropdown, Grid, Header, Divider } from "semantic-ui-react";
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
      direction: null
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("receipts")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          console.log(doc.id, " => ", doc.data());
        });
      })
      .then(() => this.setState({ data: documents }));
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

    this.setState({
      data: data.slice().reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { data, column, direction } = this.state;
    console.log(this.state.data);
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
                <Table.HeaderCell width={3}>Store</Table.HeaderCell>
                <Table.HeaderCell width={6}>Description</Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "Total" ? direction : null}
                  onClick={this.handleSort("Total")}
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
