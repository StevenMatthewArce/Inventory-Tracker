import React, { Component } from "react";
import { Form, Button, Message, Icon, Header } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { db } from "../Firebase";

export class Correction extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      item: this.props.items
    };

    this.state = {
      ...initialState,
      message: null,
      error: null,
      sucess: false
    };
  }

  saveAndContinue = e => {
    //change this to submit here
    e.preventDefault();

    this.setState({ sucess: false });
    let items = [];
    for (var i = 0; i < this.state.item.name.length; i++) {
      items = {
        name: this.state.item.name[i],
        cost: this.state.item.cost[i],
        quantity: this.state.item.quantity[i],
        dateRestocked: this.state.item.dateRestocked
      };
      let { name, cost, quantity, dateRestocked } = items;
      db.collection("items")
        .add({ name, cost, quantity, dateRestocked })
        .then(() => {
          this.setState({ message: "Items has been submitted. " });
        })
        .catch(err => {
          this.setState({ error: err });
        });
    }

    this.setState({ sucess: true });
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  addItem = () => {
    this.setState(prevState => ({
      item: {
        ...this.state.item,
        name: [...prevState.item.name, "Test"],
        cost: [...prevState.item.cost, "0"],
        quantity: [...prevState.item.quantity, "0"]
      }
    }));
    console.log(this.state.item);
  };

  handleChange = (event, index) => {
    let itemList = this.state.item;
    let x = event.target.name;
    if (x == "name") {
      itemList.name[index] = event.target.value;
    } else if (x == "cost") {
      itemList.cost[index] = event.target.value;
    } else {
      itemList.quantity[index] = event.target.value;
    }
    this.setState({
      ...this.state.item,
      name: [itemList.name],
      cost: [itemList.cost],
      quantity: [itemList.quantity]
    });
  };

  handleRemove = i => {
    //get the previous date and then update the new date.
    this.setState({
      item: {
        name: this.state.item.name.filter((name, index) => index != i),
        cost: this.state.item.cost.filter((cost, index) => index != i),
        quantity: this.state.item.quantity.filter(
          (quantity, index) => index != i
        ),
        dateRestocked: this.state.dateRestocked
      }
    });
    console.log(this.state.item);
  };
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Header as="h1" textAlign="center">
          Detected Receipt Items
        </Header>

        <Form sucess error>
          {this.state.item.name.map((name, index) => {
            return (
              <div key={name}>
                <Form.Group inline>
                  <Form.Input
                    label="Name"
                    name="name"
                    value={name}
                    onChange={e => this.handleChange(e, index)}
                    required
                  />
                  <Form.Input
                    label="Cost"
                    name="cost"
                    value={this.state.item.cost[index]}
                    onChange={e => this.handleChange(e, index)}
                    required
                  />

                  <Form.Input
                    label="Quantity"
                    name="qunatity"
                    value={this.state.item.quantity[index]}
                    onChange={e => this.handleChange(e, index)}
                    required
                  />
                  <DateInput
                    required
                    label="Date Restocked"
                    name="dateRestocked"
                    value={this.state.item.dateRestocked}
                    iconPosition="left"
                  />

                  <Button negative onClick={() => this.handleRemove(index)}>
                    Remove
                  </Button>
                </Form.Group>
              </div>
            );
          })}
          {this.state.message && (
            <Message icon="smile" positive>
              {this.state.message}
            </Message>
          )}
          {this.state.error && (
            <Message icon="frown" negative>
              {this.state.error}
            </Message>
          )}
          <Button.Group>
            <Button positive onClick={e => this.addItem(e)}>
              Add Item
            </Button>
            <Button primary onClick={this.back}>
              Back
            </Button>
            <Button primary type="submit" onClick={this.saveAndContinue}>
              Submit
            </Button>
          </Button.Group>
          {console.log(this.state.sucess)}
        </Form>
      </div>
    );
  }
}

export default Correction;
