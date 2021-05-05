import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search,
  Button,
  Checkbox,
  Icon,
  Message
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
      message: null,
      uid: props.uid
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("users")
      .doc(this.state.uid)
      .collection("orders")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
      })
      .then(() => {
        let unfinished = [];
        documents.map(element => {
          if (element.finished == 0) {
            unfinished.push(element);
          }
        });
        this.setState({ data: unfinished });
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
    this.setState(
      { checked: checked, error: null, message: null },
      console.log(this.state.checked)
    );
  };

  removeItem = () => {
    let { checked } = this.state;
    if (checked.length < 1) {
      this.setState({ error: "Please Check an Order" });
    } else {
      checked.map(element => {
        db.collection("users")
          .doc(this.state.uid)
          .collection("orders")
          .doc(element)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            this.setState({ message: "Sucessfully removed Order" });
          })
          .catch(error => {
            console.error("Error removing document: ", error);
            this.setState({ error: "Error removing doucment" });
          });
      });
    }
  };

  markCompleted = () => {
    let { checked, data, error, message } = this.state;
    if (checked.length < 1) {
      this.setState({ error: "Please Check an Order Box" });
    } else {
      checked.map(checkedElement => {
        const checkedGoods = data.filter(data => data.id == checkedElement);
        console.log(checkedGoods[0]);
        const item = checkedGoods.map(element => element.items);
        console.log(item);
        item[0].map(element => {
          let itemsToRemove = [];
          console.log(element);
          db.collection("users")
            .doc(this.state.uid)
            .collection("finishedgoods")
            .where("name", "==", element.name)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                itemsToRemove.push({ id: doc.id, ...doc.data() });
              });
            })
            .then(() => {
              console.log(itemsToRemove);
              console.log(itemsToRemove[0]);
              console.log(itemsToRemove);
              if (itemsToRemove[0].quantity > element.quantity) {
                let newQty = itemsToRemove[0].quantity - element.quantity;
                db.collection("users")
                  .doc(this.state.uid)
                  .collection("finishedgoods")
                  .doc(itemsToRemove[0].id)
                  .update({ quantity: newQty });
                console.log("First");
              } else if (itemsToRemove[0].quantity === element.quantity) {
                db.collection("users")
                  .doc(this.state.uid)
                  .collection("finishedgoods")
                  .doc(itemsToRemove[0].id)
                  .delete()
                  .then(() => {
                    console.log("Document successfully deleted!");
                  });
                console.log("Second");
              } else {
                //!! If the second item doesnt have enough materials there is no check
                //!! If the second item doesnt have enough but the first one does it will still go through
                let remainingItems =
                  itemsToRemove[0].quantity - element.quantity;
                if (itemsToRemove.length == 1) {
                  console.log(itemsToRemove.length);
                  let error = "Not enough raw materials";
                  this.setState({ error: error });
                  return;
                } else {
                  db.collection("users")
                    .doc(this.state.uid)
                    .collection("finishedgoods")
                    .doc(itemsToRemove[1].id)
                    .delete();
                  itemsToRemove[1].quantity =
                    itemsToRemove[1].quantity - remainingItems;
                  db.collection("users")
                    .doc(this.state.uid)
                    .collection("items")
                    .doc(itemsToRemove[1].id)
                    .update({ quantity: itemsToRemove[1].quantity });
                  console.log("Third");
                }
              }
            });
        });

        console.log(this.state);
        if (error == null) {
          console.log("Error");
          db.collection("users")
            .doc(this.state.uid)
            .collection("orders")
            .doc(checkedElement)
            .update({ finished: "1" })
            .then(() => {
              console.log("Document successfully deleted!");
              this.setState({ message: "Sucessfully marked as Finished" });
            })

            .then(() => this.setState({ error: false }))
            .catch(error => {
              this.setState({ error: "Did not mark as Finished" });
            });
          let currentdate = new Date();

          const getFormattedDate = date => {
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, "0");
            let day = date
              .getDate()
              .toString()
              .padStart(2, "0");
            return month + "/" + day + "/" + year;
          };

          currentdate = getFormattedDate(currentdate);

          db.collection("users")
            .doc(this.state.uid)
            .collection("sales")
            .add({
              ...checkedGoods,
              currentdate
            });
        }
      });
    }
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

    console.log(this.state.checked.map(element => element));

    return (
      <div>
        <div>
          <div>
            {this.state.error && (
              <Message icon="frown" negative>
                {this.state.error}
              </Message>
            )}
            {this.state.message && (
              <Message icon="smile" positive>
                {this.state.message}
              </Message>
            )}
          </div>
          <br />
          <Grid columns="equal">
            <Grid.Column width={8}>
              <Header as="h1"style={{color:"#36393e"}}>Current Orders</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button.Group>
                <Button
                  icon
                  labelPosition="left"
                  style={{backgroundColor:"#36393e", color:"#ffffff"}}
                  size="small"
                  onClick={this.removeItem}
                >
                  <Icon name="close"></Icon>
                  Remove
                </Button>
                <Dropdown
                  className="ui small icon left labeled button"
                  style={{backgroundColor:"#77c90e", color:"#ffffff"}}
                  text="Add"
                  labeled
                  button
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
              </Button.Group>
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
                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}}/>
                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}}
                  width={1}
                  sorted={column === "DateReceived" ? direction : null}
                  onClick={this.handleSort("DateReceived")}
                >
                  Date Received
                </Table.HeaderCell>
                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}}
                  width={1}
                  sorted={column === "DateNeedBy" ? direction : null}
                  onClick={this.handleSort("DateNeedBy")}
                >
                  Date Needed By
                </Table.HeaderCell>
                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}}
                  width={2}
                  sorted={column === "Customer" ? direction : null}
                  onClick={this.handleSort("Customer")}
                >
                  Customer
                </Table.HeaderCell>
                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}} width={4}>Items</Table.HeaderCell>
                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}} width={4}>Comments</Table.HeaderCell>

                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}} width={1}>Labor Rate</Table.HeaderCell>
                <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}} width={1}>Labor (hrs)</Table.HeaderCell>
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}} width={1}>Mark Up</Table.HeaderCell>
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}} width={1}>Total Cost</Table.HeaderCell>
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
