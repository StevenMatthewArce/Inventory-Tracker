import React, { Component } from "react";
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Dropdown,
  Segment
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

//TODO: Add logic to not submit unless required fields have been added

export class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      name: "",
      orderCost: 0,
      laborRate: 0,
      totalLabor: 0,
      markUp: 0,
      dateReceived: "",
      dateNeededBy: "",
      comment: "",
      items: [],
      message: null,
      error: null
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("recipes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .then(() => {
        const newDoc = [];
        for (var i = 0; i < documents.length; i++) {
          const { name, items } = documents[i];
          newDoc.push({
            text: name,
            value: name,
            description: items.map(element => element.name).join(", "),
            key: name,
            ...documents[i]
          });
        }

        this.setState({ recipes: newDoc });
      });
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
  };

  handleChange2 = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value }, this.updateItemFields);
  };

  handleItemNameChange = (e, { name, id, value }) => {
    e.preventDefault();
    let { items, recipes } = this.state;

    const filterdGoods = recipes.filter(element => element.name == value);

    const unitCost = parseFloat(filterdGoods[0].receipeCost);

    const unitLabor =
      parseFloat(filterdGoods[0].totalLabor) /
      parseFloat(filterdGoods[0].qtyProduced);
    items[id] = {
      ...items[id],
      [name]: value,
      unitCost: unitCost.toFixed(2),
      timeSpent: unitLabor.toFixed(2)
    };

    // console.log(items);
    this.setState({ items: items }, this.updateItemFields);
  };

  handleItemQtyChange = (e, { name, id, value }) => {
    e.preventDefault();
    let { items } = this.state;

    items[id] = { ...items[id], [name]: value };

    this.setState({ items: items }, this.updateItemFields);
  };

  updateTotalCost = () => {
    // let finishedGoodCost = 0;
    // finishedGoodCost = ((parseFloat(selected[0].receipeCost) + ((laborRate*timeSpent)/quantity))*(1+(markUp/100)))
    // finishedGoodCost = finishedGoodCost.toFixed(2)
    let { orderCost, items } = this.state;

    if (items.length > 1) {
      orderCost = items.reduce(
        (a, b) =>
          parseFloat(a.unitCost) * parseInt(a.quantity) +
          parseFloat(b.unitCost) * parseInt(b.quantity)
      );
    } else if (items.length == 0) {
      orderCost = 0;
    } else {
      orderCost = parseFloat(items[0].unitCost) * parseInt(items[0].quantity);
    }

    return orderCost;
  };

  updateTotalLabor = () => {
    let { totalLabor, items } = this.state;

    if (items.length > 1) {
      totalLabor = items.reduce(
        (a, b) => parseFloat(a.timeSpent) + parseFloat(b.timeSpent)
      );
    } else if (items.length == 0) {
      totalLabor = 0;
    } else {
      totalLabor = parseFloat(items[0].timeSpent);
    }

    return totalLabor;
  };

  updateItemFields = () => {
    let { totalLabor, orderCost, laborRate, markUp } = this.state;

    const cost = this.updateTotalCost();
    const labor = this.updateTotalLabor();
    // console.log(1 + parseInt(markUp) / 100);

    orderCost = (cost + totalLabor * laborRate) * (1 + parseInt(markUp) / 100);

    this.setState({ orderCost: orderCost.toFixed(2), totalLabor: labor });
  };

  submit = e => {
    e.preventDefault();

    let {
      name,
      dateReceived,
      dateNeededBy,
      comment,
      items,
      orderCost,
      laborRate,
      totalLabor,
      markUp
    } = this.state;
    let finished = "0";

    db.collection("orders")
      .add({
        name,
        dateReceived,
        dateNeededBy,
        comment,
        items,
        finished,
        orderCost,
        laborRate,
        totalLabor,
        markUp
      })
      .then(() => {
        this.setState({ message: "Order has been submitted. " });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  addItem = () => {
    let items = this.state.items;
    let newItem = {
      id: items.length,
      name: items.name,
      timeSpent: 0,
      unitCost: 0,
      quantity: "1"
    };
    items.push(newItem);
    this.setState({ items: items });
  };

  removeItem = id => {
    let items = this.state.items;
    items = items.filter(x => x.id != id);
    this.setState({ items: items });
  };

  render() {
    return (
      <Segment style={{ height: "90vh" }}>
        <div>
          <Button labelPosition="left" icon secondary as={Link} to="/orders">
            Back
            <Icon name="left arrow"></Icon>
          </Button>
        </div>
        <br></br>
        <div>
          <Grid>
            <Grid.Column width={9}>
              <Grid.Row>
                <Header as="h1" textAlign="left">
                  Add an Order
                </Header>
                <Grid.Row>Please add your new orders.</Grid.Row>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7} textAlign="right">
              <Button labelPosition="left" icon positive onClick={this.addItem}>
                Add
                <Icon name="plus"></Icon>
              </Button>
              <Button labelPosition="right" icon primary onClick={this.submit}>
                Submit
                <Icon name="send" />
              </Button>
            </Grid.Column>
          </Grid>
        </div>
        <Divider />
        <Form>
          <Form.Group>
            <Form.Input
              required
              icon="tag"
              iconPosition="left"
              width={8}
              //   id={items.id}
              label="Customer Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <DateInput
              required
              width={4}
              dateFormat={"MM/DD/YYYY"}
              label="Date Received"
              name="dateReceived"
              value={this.state.dateReceived}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <DateInput
              required
              width={4}
              dateFormat={"MM/DD/YYYY"}
              label="Date Needed By"
              name="dateNeededBy"
              value={this.state.dateNeededBy}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              required
              width={4}
              icon="dollar"
              iconPosition="left"
              label="Labor Rate"
              name="laborRate"
              onChange={this.handleChange2}
              value={this.state.laborRate}
            />
            <Form.Input
              width={4}
              readOnly
              icon="time"
              iconPosition="left"
              label="Total Labor"
              name="totalLabor"
              value={this.state.totalLabor}
            />
            <Form.Input
              required
              width={4}
              icon="percent"
              iconPosition="right"
              label="Mark Up"
              name="markUp"
              onChange={this.handleChange2}
              value={this.state.markUp}
            />
            <Form.Input
              width={4}
              readOnly
              icon="dollar"
              iconPosition="left"
              label="Total Cost"
              name="orderCost"
              value={this.state.orderCost}
            />
          </Form.Group>

          <Form.TextArea
            width={16}
            name="comment"
            style={{ minHeight: 100 }}
            label="Description:"
            placeholder="This is some comment about the order"
            onChange={this.handleChange}
          />
          {this.state.items.map(items => {
            return (
              <div key={items.id}>
                <Form.Group centered>
                  <Form.Select
                    required
                    width={8}
                    label="Recipe"
                    name="name"
                    placeholder="Recipe"
                    id={items.id}
                    options={this.state.recipes}
                    value={items.name}
                    onChange={this.handleItemNameChange}
                  />
                  <Form.Input
                    required
                    width={2}
                    label="Quantity"
                    name="quantity"
                    id={items.id}
                    value={items.quantity}
                    onChange={this.handleItemQtyChange}
                  />
                  <Form.Input
                    width={2}
                    readOnly
                    icon="clock"
                    iconPosition="left"
                    id={items.id}
                    value={items.timeSpent}
                    label="Time per Unit"
                    name="timeSpent"
                  />
                  <Form.Input
                    width={2}
                    readOnly
                    icon="dollar"
                    iconPosition="left"
                    id={items.id}
                    value={items.unitCost}
                    label="Unit Cost"
                    name="unitCost"
                  />
                  <Button
                    style={{ height: 37.8, top: 25 }}
                    labelPosition="left"
                    size="tiny"
                    icon
                    negative
                    onClick={() => this.removeItem(items.id)}
                  >
                    Remove
                    <Icon name="minus"></Icon>
                  </Button>
                </Form.Group>
              </div>
            );
          })}
        </Form>
        {this.state.message && <Message positive>{this.state.message}</Message>}
        {this.state.error && <Message negative>{this.state.error}</Message>}
      </Segment>
    );
  }
}

export default AddOrder;
