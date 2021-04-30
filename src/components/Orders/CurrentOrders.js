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
      checked: [],
      error: null,
      message: ""
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
        documents.map(element => {
          if (element.finished == 0) {
            unfinished.push(element);
          }
        });
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
    let { checked, data, error, message } = this.state;

    checked.map(checkedElement => {
      const checkedGoods = data.filter(data => data.id == checkedElement);
      const item = checkedGoods.map(element => element.items);
      item[0].map(element => {
        let itemsToRemove = [];
        db.collection("finishedgoods")
          .where("name", "==", element.name)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              itemsToRemove.push({ id: doc.id, ...doc.data() });
            });
          })
          .then(() => {
            if (itemsToRemove[0].quantity > element.quantity) {
              let newQty = itemsToRemove[0].quantity - element.quantity;
              db.collection("finishedgoods")
                .doc(itemsToRemove[0].id)
                .update({ quantity: newQty });
              console.log("First");
            } else if (itemsToRemove[0].quantity === element.quantity) {
              db.collection("finishedgoods")
                .doc(itemsToRemove[0].id)
                .delete()
                .then(() => {
                  console.log("Document successfully deleted!");
                });
              console.log("Second");
            } else {
              //!! If the second item doesnt have enough materials there is no check
              //!! If the second item doesnt have enough but the first one does it will still go through
              let remainingItems = itemsToRemove[0].quantity - element.quantity;
              if (itemsToRemove.length == 1) {
                console.log(itemsToRemove.length);
                let error = "Not enough raw materials";
                this.setState({ error: true, message: error });
                return;
              } else {
                db.collection("finishedgoods")
                  .doc(itemsToRemove[1].id)
                  .delete();
                itemsToRemove[1].quantity =
                  itemsToRemove[1].quantity - remainingItems;
                db.collection("items")
                  .doc(itemsToRemove[1].id)
                  .update({ quantity: itemsToRemove[1].quantity });
                console.log("Third");
              }
            }
          });
      });

      console.log(this.state);
      if (error != true) {
        console.log("Error");
        db.collection("orders")
          .doc(checkedElement)
          .update({ finished: "1" })
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .then(() => this.setState({ error: false }))
          .catch(error => {
            console.error("Error removing document: ", error);
          });
      }
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
              Items:
              {items
                .map(element => element.quantity + " " + element.name)
                .join(", ")}
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
                <Table.HeaderCell width={4}>Comments</Table.HeaderCell>

                <Table.HeaderCell width={1}>Labor Rate</Table.HeaderCell>
                <Table.HeaderCell width={1}>Labor (hrs)</Table.HeaderCell>
                <Table.HeaderCell width={1}>Mark Up</Table.HeaderCell>
                <Table.HeaderCell width={1}>Total Cost</Table.HeaderCell>
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
                    <Table.Cell>
                      {items.items
                        .map(element => element.quantity + " " + element.name)
                        .join(", ")}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.comment}</Table.Cell>
                    <Table.Cell textAlign="center">
                      ${items.laborRate}/hr
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.totalLabor}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.markUp} %</Table.Cell>
                    <Table.Cell textAlign="center">
                      $ {items.orderCost}
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

export default CurrentOrders;
