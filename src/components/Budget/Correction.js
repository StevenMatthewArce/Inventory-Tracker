import React, { Component } from "react";
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { db } from "../Firebase";

export default class Correction extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      items: [...this.props.items]
    };

    this.state = {
      ...initialState,
      message: null,
      error: null
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submit = this.submit.bind(this);
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  submit = e => {
    e.preventDefault();
    let items = this.state.items;

    items.forEach(element => {
      let { name, cost, quantity, dateRestocked } = element;
      db.collection("items")
        .add({ name, cost, quantity, dateRestocked })
        .then(() => {
          this.setState({ message: "Items has been submitted. " });
        })
        .catch(err => {
          this.setState({ error: err });
        });
    });
  };

  addItem = () => {
    let items = this.state.items;
    let newItem = {
      id: items.length,
      name: "New Item",
      cost: "0",
      quantity: "1",
      dateRestocked: "03/27/2021"
    };
    items.push(newItem);
    this.setState({ items: items }, console.log(this.state));
  };

  removeItem = id => {
    let items = this.state.items;
    items = items.filter(x => x.id != id);
    this.setState({ items: items }, console.log(this.state));
  };

  handleChange = (e, { name, id, value }) => {
    e.preventDefault();
    let items = this.state.items;

    items[id] = { ...items[id], [name]: value };
    this.setState({ items: items }, console.log(this.state));
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Header as="h1" textAlign="center">
          Detected Receipt Items
        </Header>
        <Form>
          {this.state.items.map(items => {
            return (
              <div key={items.id}>
                <Form.Group inline>
                  <Form.Input
                    required
                    icon="tag"
                    iconPosition="left"
                    width={4}
                    id={items.id}
                    label="Name"
                    name="name"
                    id={items.id}
                    value={items.name}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    required
                    icon="dollar sign"
                    iconPosition="left"
                    width={4}
                    label="Cost"
                    name="cost"
                    id={items.id}
                    value={items.cost}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    required
                    icon="shopping cart"
                    iconPosition="left"
                    width={4}
                    label="Quantity"
                    name="quantity"
                    id={items.id}
                    value={items.quantity}
                    onChange={this.handleChange}
                  />
                  <DateInput
                    required
                    width={6}
                    dateFormat={"MM/DD/YYYY"}
                    label="Date Restocked"
                    name="dateRestocked"
                    id={items.id}
                    value={items.dateRestocked}
                    iconPosition="left"
                    onChange={this.handleChange}
                  />
                  <Button
                    labelPosition="left"
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
        <Divider></Divider>
        <Button.Group>
          <Button labelPosition="left" icon primary onClick={this.back}>
            Back
            <Icon name="left arrow"></Icon>
          </Button>
          <Button labelPosition="left" icon positive onClick={this.addItem}>
            Add
            <Icon name="plus"></Icon>
          </Button>
          <Button labelPosition="right" icon primary onClick={this.submit}>
            Submit
            <Icon name="send"></Icon>
          </Button>
        </Button.Group>
      </div>
    );
  }
}
