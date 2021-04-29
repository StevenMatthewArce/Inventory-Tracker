import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _, { times } from "lodash";

export class FinishedGoods extends Component {
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

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    const { data } = this.state;
    const { name } = data;

    console.log(data);
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
    const resRender = ({
      name,
      finishedGoodCost,
      quantity,
      timeSpent,
      items
    }) => {
      return (
        <div key="name">
          <Grid>
            <Grid.Column width={5}>Recipe Name: {name}</Grid.Column>
            <Grid.Column width={5}>
              Ingredients: {items.map(element => element.name).join(", ")}{" "}
            </Grid.Column>
            <Grid.Column width={2}>Quantity: {quantity}</Grid.Column>
            <Grid.Column width={2}>Time: {timeSpent} hours</Grid.Column>
            <Grid.Column width={2}>Cost: ${finishedGoodCost}</Grid.Column>
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
