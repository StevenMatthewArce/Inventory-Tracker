import React, { Component } from "react";
import { Table, Dropdown, Grid, Header, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _ from "lodash";

//TODO: ADD SORTING ALG
//TODO: ADD CHECKBOX TO ADD TO COMPLETED ORDERS

export class CurrentOrders extends Component {
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
    db.collection("orders")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          console.log(doc.id, " => ", doc.data());
        });
        console.log(documents);
      })
      .then(() => {
        let unfinished = [];
        for (var i = 0; i < documents.length; i++) {
          if (documents[i].finished == "0") {
            unfinished.push(documents[i]);
          }
        }
        this.setState({ data: unfinished }, console.log(unfinished));
      });
  }

  //TODO: ADD SORTING ALG
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

  render() {
    const { data, column, direction } = this.state;
    console.log(this.state);
    return (
      <div>
        <div>
          <Grid columns="equal">
            <Grid.Column width={12}>
              <Header as="h1">Current Orders</Header>
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
                    text="Order"
                    as={Link}
                    to="/addOrder"
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
                  sorted={column === "DateReceived" ? direction : null}
                  onClick={this.handleSort("DateReceived")}
                >
                  Date Received
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "DateNeedBy" ? direction : null}
                  onClick={this.handleSort("DateNeedBy")}
                >
                  Date Needed By
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={2}
                  sorted={column === "Customer" ? direction : null}
                  onClick={this.handleSort("Customer")}
                >
                  Customer
                </Table.HeaderCell>
                <Table.HeaderCell width={4}>Items</Table.HeaderCell>
                <Table.HeaderCell width={5}>Comments</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.id}>
                    <Table.Cell textAlign="center">
                      {items.dateReceived}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.dateNeededBy}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.name}</Table.Cell>
                    <Table.Cell>{items.items.join(", ")}</Table.Cell>
                    <Table.Cell textAlign="center">{items.comment}</Table.Cell>
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

export default CurrentOrders;
