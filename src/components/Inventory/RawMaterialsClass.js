import React, { Component, useState } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search,
  Icon,
  Modal,
  Button,
  Form,
  Checkbox,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _, { flatMap, floor, negate } from "lodash";
import "./style.css";
import { AuthContext } from "../App/Auth";
import { Redirect } from "react-router-dom";

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
    console.log(this.props);

    this.state = {
      data: [],
      column: null,
      direction: null,
      isLoading: false,
      results: [],
      value: "",
      isOpen: [false],
      modalOpen: false,
      settings: [],
      checked: [],
      error: null,
      message: null,
      redirect: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }
  static contextType = AuthContext;

  componentDidMount() {
    const currentUser = this.context;

    console.log(currentUser);
    console.log(currentUser);
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

    db.collection("settings").onSnapshot(snap => {
      let documents = [];
      snap.forEach(doc => {
        documents = { ...doc.data(), id: doc.id };
      });
      this.setState({ settings: documents });
    });

    //!Uncomment this when firebase is back up
    // var catagories = _.groupBy(data, items => {
    //   return items.name;
    // });
    // // console.log(catagories);
    // this.setState({ data: catagories });
    if (!currentUser) {
    }
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

  handleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen }, console.log(this.state.modalOpen));
  };

  handleChange = (e, { value }) => {
    e.preventDefault();
    let { settings } = this.state;
    settings = { id: settings.id, alertQty: value };
    this.setState({ settings: settings });
  };

  updateAlertSetting = () => {
    let { settings } = this.state;
    db.collection("settings")
      .doc(settings.id)
      .update({ alertQty: settings.alertQty })
      .then(this.setState({ modalOpen: false }));
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
      this.setState({ error: "Please Check a Raw Material" });
    } else {
      checked.map(element => {
        db.collection("items")
          .doc(element)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            this.setState({ message: "Sucessfully removed Raw Material" });
          })
          .catch(error => {
            console.error("Error removing document: ", error);
            this.setState({ error: "Error removing doucment" });
          });
      });
    }
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

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

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

    console.log(this.state);
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
              <Header as="h1">Raw Materials</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Grid.Row>
                <Button.Group>
                  <Button
                    icon
                    labelPosition="left"
                    negative
                    size="small"
                    onClick={this.removeItem}
                  >
                    <Icon name="close"></Icon>
                    Remove
                  </Button>
                  <Dropdown
                    className="ui small icon black left labeled button"
                    text="Add"
                    labeled
                    button
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item
                        content="Item"
                        icon="tags"
                        labelPosition="right"
                        as={Link}
                        to="/addItem"
                      />
                      <Dropdown.Item
                        content="Alert"
                        icon="exclamation"
                        labelPosition="right"
                        onClick={this.handleModal}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Button.Group>
              </Grid.Row>
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
          <Table id="table" celled selectable structured definition>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell />
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
                <Table.HeaderCell width={1}>Unit Cost</Table.HeaderCell>
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
              totalCost = totalCost / items.length;
              totalCost = totalCost.toFixed(2);
              const restockedDatesSorted = items
                .map(element => element.dateRestocked)
                .sort((a, b) => {
                  return Date.parse(a) - Date.parse(b);
                });
              return (
                <Table.Body>
                  <Table.Row
                    negative={
                      totalQty >= this.state.settings.alertQty ? false : true
                    }
                    key={value}
                    onClick={() => this.handleToggle(index)}
                  >
                    <Table.Cell collapsing></Table.Cell>
                    <Table.Cell textAlign="center">
                      <Icon name="dropdown" />
                      {value}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{}</Table.Cell>
                    <Table.Cell id="quantity" textAlign="center">
                      {totalQty}
                    </Table.Cell>
                    <Table.Cell textAlign="center">${totalCost}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {restockedDatesSorted[0]}
                    </Table.Cell>
                  </Table.Row>
                  {items.map(items => {
                    return (
                      <Table.Row
                        key={items.id}
                        style={
                          isOpen[index]
                            ? { display: "table-row" }
                            : { display: "none" }
                        }
                        negative={
                          totalQty >= this.state.settings.alertQty
                            ? false
                            : true
                        }
                      >
                        <Table.Cell collapsing>
                          <Checkbox id={items.id} onClick={this.toggleCheck} />
                        </Table.Cell>
                        <Table.Cell textAlign="left">{items.name}</Table.Cell>
                        <Table.Cell textAlign="center">
                          {items.description}
                        </Table.Cell>
                        <Table.Cell id={"alert"} textAlign="center">
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
        <Modal open={this.state.modalOpen} size={"small"}>
          <Modal.Header>Change Alert Setting</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Raw Material Alert</Header>
              <p>
                The raw material row will get highlighted when it falls below a
                certain quantity.
              </p>
              <p>Please select the minimum quantity before sending an alert.</p>
              <Form>
                <Form.Input
                  label="Alert Minimum Quantity:"
                  name="alertQty"
                  value={this.state.settings.alertQty}
                  onChange={this.handleChange}
                />
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={this.updateAlertSetting}
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default RawMaterials;