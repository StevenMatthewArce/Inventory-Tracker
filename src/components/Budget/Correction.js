import React, { Component } from "react";

import { Redirect } from 'react-router-dom';
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Card
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { db } from "../Firebase";

//TODO: Stylze Card - add picture/logo
//TODO: Link back to Expense after submiting item
class Correction extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      store: this.props.store,
      totalCost: this.props.totalCost,
      description: this.props.description
    };

    let initialItems = {
      items: [...this.props.items]
    };

    if (this.props.items.length === 0) {
      initialItems = {
        items: [
          {
            id: "0",
            name: "",
            cost: "",
            quantity: "",
            dateRestocked: ""
          }
        ]
      };
    }

    this.state = {
      ...initialItems,
      ...initialState,
      message: null,
      error: null, 
      redirect: false
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
    let { store, totalCost, description } = this.state;
    let date = this.state.items[0].dateRestocked;
    let type = "Receipt";

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

    db.collection("receipts").add({
      store,
      totalCost,
      description,
      date,
      type
    });
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 3000)
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
    items = items.filter(x => x.id !== id);
    this.setState({ items: items }, console.log(this.state));
  };

  handleChange = (e, { name, id, value }) => {
    e.preventDefault();
    let items = this.state.items;

    items[id] = { ...items[id], [name]: value };
    this.setState({ items: items }, console.log(this.state));
  };

  render() {
    let date = this.state.items[0].dateRestocked;

    if (this.state.redirect) {
      return <Redirect to='/budget' />
    }

    return (
      <div style={{ height: "100vh" }}>
        {console.log(this.props)}
        <div>
          <Button labelPosition="left" icon secondary onClick={this.back}>
            Back
            <Icon name="left arrow"></Icon>
          </Button>
        </div>
        <br></br>
        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={9}>
                <Grid.Row>
                  <Header as="h1" textAlign="left">
                    Verification
                  </Header>
                  <Grid.Row>
                    Please check the scanned items or manually add items.
                    <br></br>
                    Hit submit once complete.
                  </Grid.Row>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={7} textAlign="right">
                <Button
                  labelPosition="left"
                  icon
                  positive
                  onClick={this.addItem}
                >
                  Add
                  <Icon name="plus"></Icon>
                </Button>
                <Button
                  labelPosition="right"
                  icon
                  primary
                  onClick={this.submit}
                >
                  Submit
                  <Icon name="send"></Icon>
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Card
                centered
                header={this.state.store}
                meta={date}
                description={this.state.description}
                extra={
                  <p>
                    <Icon name="dollar sign" />
                    {this.state.totalCost}
                  </p>
                }
              />
            </Grid.Row>
          </Grid>
        </div>
        <Divider />

        <div>
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
          {this.state.message && (
            <Message positive>{this.state.message}</Message>
          )}
          {this.state.error && <Message negative>{this.state.error}</Message>}
        </div>
      </div>
    );
  }
}

export default Correction;