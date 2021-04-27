import React, { Component, useState } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _, { floor } from "lodash";
import "./style.css";

//! ONLY FOR TESTING W/Out Firebase
const data = [
  {
    cost: "5.00",
    dateRestocked: "01-06-2021",
    description: "This is an Apples Test 1",
    id: "C3vt9MLMcEPD8tpa8MyC",
    imageAsUrl: "",
    name: "Apples",
    quantity: "10"
  },
  {
    cost: "32.99",
    dateRestocked: "01-09-2021",
    description: "This is an Oranges Test 1",
    id: "brsSdYjT5VTfFOPtW8JD",
    imageAsUrl: "",
    name: "Oranges",
    quantity: "19"
  },
  {
    cost: "3.56",
    dateRestocked: "01-01-2021",
    description: "This is an Oranges Test 2",
    id: "qQlC3RfRomdQoqXjtggg",
    imageAsUrl: "",
    name: "Oranges",
    quantity: "11"
  }
];

export class RawMaterials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      column: null,
      direction: null,
      isLoading: false,
      results: [],
      value: "",
      isOpen: [false]
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    //!Uncomment this when firebase is back up
    db.collection("items")
      .orderBy("quantity", "desc")
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        var catagories = _.groupBy(documents, items => {
          return items.name;
        });
        this.setState({
          data: catagories
        });
      });
    //!Uncomment this when firebase is back up
    // var catagories = _.groupBy(data, items => {
    //   return items.name;
    // });
    // // console.log(catagories);
    // this.setState({ data: catagories });
  }

  //! SORTING DOESNT WORK WITH DICTIONARIES
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    const keys = Object.keys(data);
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        categoryNames: _.sortBy(keys, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }

    this.setState({
      categoryNames: keys.slice().reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    const { data } = this.state;

    const keys = Object.keys(data);

    this.setState({ isLoading: true, value });

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result);

      this.setState({
        isLoading: false,
        results: _.filter(keys, isMatch)
      });
    }, 300);
  };

  handleToggle = index => {
    const { isOpen } = this.state;
    isOpen[index] = !isOpen[index];
    this.setState({ isOpen: isOpen });
  };

  render() {
    const {
      data,
      column,
      direction,
      isLoading,
      value,
      results,
      isOpen
    } = this.state;

    const resRender = () => {
      const { results, data } = this.state;

      const items = data[results[0]];
      return (
        <>
          {items.map(element => {
            return (
              <Grid columns="equal">
                <Grid.Column>Name: {element.name} </Grid.Column>
                <Grid.Column>Quantity: {element.quantity}</Grid.Column>
                <Grid.Column>Cost: {element.cost}</Grid.Column>
              </Grid>
            );
          })}
        </>
      );
    };

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
                    icon="tags"
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
                className="search-area"
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
        <br />
        <div>
          {/*FIXME: ADD SORTABLE TO MAKE SORTABLE */}
          <Table celled selectable structured>
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
                <Table.HeaderCell width={1}>Cost</Table.HeaderCell>
                <Table.HeaderCell
                  width={2}
                  sorted={column === "dateRestocked" ? direction : null}
                  onClick={this.handleSort("dateRestocked")}
                >
                  Date Restocked
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {Object.keys(data).map((value, index) => {
              const items = data[value];

              let totalCost = 0;
              let totalQty = 0;

              items.forEach(element => {
                totalCost += parseFloat(element.cost);
                totalQty += parseFloat(element.quantity);
              });
              totalCost = floor(totalCost / items.length);

              const restockedDatesSorted = items
                .map(element => element.dateRestocked)
                .sort((a, b) => {
                  return Date.parse(a) - Date.parse(b);
                });

              return (
                <Table.Body>
                  <Table.Row
                    key={value}
                    onClick={() => this.handleToggle(index)}
                  >
                    <Table.Cell textAlign="center">
                      <Icon name="dropdown" />
                      {value}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{}</Table.Cell>
                    <Table.Cell textAlign="center">{totalQty}</Table.Cell>
                    <Table.Cell textAlign="center">${totalCost}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {restockedDatesSorted[0]}
                    </Table.Cell>
                  </Table.Row>

                  {/* <Table.Row
                    style={
                      isOpen[index]
                        ? { display: "table-row" }
                        : { display: "none" }
                    }
                  >
                    <Table.HeaderCell textAlign="center">
                      Material Name
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      Description
                    </Table.HeaderCell>

                    <Table.HeaderCell textAlign="center">
                      Quantity
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Cost</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      Date Restocked
                    </Table.HeaderCell>
                  </Table.Row> */}

                  {items.map(items => {
                    return (
                      <Table.Row
                        key={items.id}
                        style={
                          isOpen[index]
                            ? { display: "table-row" }
                            : { display: "none" }
                        }
                      >
                        <Table.Cell textAlign="left">{items.name}</Table.Cell>
                        <Table.Cell textAlign="center">
                          {items.description}
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          {items.quantity}
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          ${items.cost}
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          {items.dateRestocked}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
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
