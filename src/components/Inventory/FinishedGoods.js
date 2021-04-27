import React, { Component } from "react";
import { Table, Dropdown, Grid, Header, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _ from "lodash";

export class FinishedGoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      column: null,
      direction: null
    };
  }

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

  componentDidMount() {
    db.collection("finishedgoods")
      .orderBy("quantity", "desc")
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          data: documents
        });
      });
  }

  render() {
    const { data, column, direction } = this.state;
    console.log(this.state);
    return (
      <div>
        <div>
          <Grid columns="equal">
            <Grid.Column width={12}>
              <Header as="h1">Finished Goods</Header>
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
                    content="Finished Good"
                    icon="clipboard check"
                    labelPosition="right"
                    as={Link}
                    to="/addFinishedGood"
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
                  rowSpan="2"
                  width={6}
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}
                >
                  Item Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  rowSpan="1"
                  width={6}
                  sorted={column === "description" ? direction : null}
                  onClick={this.handleSort("description")}
                >
                  Ingredients
                </Table.HeaderCell>
                <Table.HeaderCell rowSpan="2" width={1}>
                  Quantity
                </Table.HeaderCell>
                <Table.HeaderCell rowSpan="2" width={1}>
                  Time (hours)
                </Table.HeaderCell>
                <Table.HeaderCell rowSpan="2" width={1}>
                  Total Cost
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.id}>
                    <Table.Cell textAlign="center">{items.name}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.items.map(element => element.name).join(", ")}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.quantity}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.timeSpent}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      ${items.finishedGoodCost}
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

export default FinishedGoods;
