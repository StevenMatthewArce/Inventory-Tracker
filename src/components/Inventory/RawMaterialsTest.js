import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search,
  GridColumn
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _ from "lodash";

export class RawMaterials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      column: null,
      direction: null,
      isLoading: false,
      results: [],
      value: ""
    };
  }

  componentDidMount() {
    db.collection("items")
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

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    const { data } = this.state;
    const { name } = data;
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(data, isMatch)
      });
    }, 300);
  };

  render() {
    const { data, column, direction, isLoading, value, results } = this.state;

    const resRender = ({ name, cost, quantity }) => {
      return (
        <div key="name">
          <Grid columns="equal">
            <Grid.Column>Material Name: {name}</Grid.Column>
            <Grid.Column>Quantity: {quantity}</Grid.Column>
            <Grid.Column>Cost: {cost}</Grid.Column>
          </Grid>
        </div>
      );
    };

    console.log(this.state);

    return (
      <div>
        <div>
          <Grid columns="equal">
            <Grid.Column width={12}>
              <Header as="h1">Raw Materials</Header>
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
                    content="Item"
                    icon=""
                    labelPosition="right"
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
          <Grid>
            <Grid.Column>
              <Search
                fluid
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={resRender}
              />
            </Grid.Column>
          </Grid>
        </div>
        <div>
          <Table sortable celled>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell
                  width={6}
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}
                >
                  Material Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={6}
                  sorted={column === "description" ? direction : null}
                  onClick={this.handleSort("description")}
                >
                  Description
                </Table.HeaderCell>

                <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                <Table.HeaderCell width={1}>Cost Per Item</Table.HeaderCell>
                <Table.HeaderCell
                  width={2}
                  sorted={column === "dateRestocked" ? direction : null}
                  onClick={this.handleSort("dateRestocked")}
                >
                  Date Restocked
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.id}>
                    <Table.Cell textAlign="center">{items.name}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.description}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.quantity}</Table.Cell>
                    <Table.Cell textAlign="center">${items.cost}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.dateRestocked}
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

export default RawMaterials;

<Table.Row key={value.id}>
  <Table.Cell textAlign="center">{value.name}</Table.Cell>
  <Table.Cell textAlign="center">{value.description}</Table.Cell>
  <Table.Cell textAlign="center">{value.quantity}</Table.Cell>
  <Table.Cell textAlign="center">${value.cost}</Table.Cell>
  <Table.Cell textAlign="center">{value.dateRestocked}</Table.Cell>
</Table.Row>;
