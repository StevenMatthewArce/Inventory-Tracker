import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search,
  Button,
  Checkbox
} from "semantic-ui-react";
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
      direction: null,
      isLoading: false,
      results: [],
      value: "",
      checked: []
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
          if (documents[i].finished === "0") {
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

    this.setState({
      data: data.slice().reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

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

  toggleCheck = (e, { id }) => {
    let { checked } = this.state;
    checked.push(id);
    this.setState({ checked: checked }, console.log(this.state.checked));
  };

  removeItem = () => {
    let { checked } = this.state;

    checked.map(element => {
      db.collection("orders")
        .doc(element)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    });
  };

  markCompleted = () => {
    let { checked } = this.state;
    checked.map(element => {
      db.collection("orders")
        .doc(element)
        .update({ finished: "1" })
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    });
  };
  render() {
    const { data, column, direction, isLoading, value, results } = this.state;
    const resRender = ({
      name,
      dateNeededBy,
      dateReceived,
      comment,
      items
    }) => {
      return (
        <div key="name">
          <Grid>
            <Grid.Column width={2}>Date Ordered: {dateReceived}</Grid.Column>
            <Grid.Column width={3}>Customer Name: {name}</Grid.Column>
            <Grid.Column width={5}>
              Items: {items.map(element => element).join(", ")}
            </Grid.Column>
            <Grid.Column width={4}>Comments: {comment}</Grid.Column>
            <Grid.Column width={2}>Date Needed: {dateNeededBy}</Grid.Column>
          </Grid>
        </div>
      );
    };

    return (
      <div>
        <div>
          <Grid columns="equal">
            <Grid.Column width={12}>
              <Header as="h1">Current Orders</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button color="red" size="small" onClick={this.removeItem}>
                Remove Selected
              </Button>
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
                  <Dropdown.Item
                    icon="check"
                    iconPosition="left"
                    text="Completed"
                    onClick={this.markCompleted}
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
          <Table sortable celled structured definition>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell />
                <Table.HeaderCell
                  width={2}
                  sorted={column === "DateReceived" ? direction : null}
                  onClick={this.handleSort("DateReceived")}
                >
                  Date Received
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={2}
                  sorted={column === "DateNeedBy" ? direction : null}
                  onClick={this.handleSort("DateNeedBy")}
                >
                  Date Needed By
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={3}
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
                    <Table.Cell collapsing>
                      <Checkbox id={items.id} onClick={this.toggleCheck} />
                    </Table.Cell>
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
