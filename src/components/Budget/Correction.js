import { stubTrue } from "lodash";
import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

export class Correction extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      item: this.props.items
    };

    this.state = {
      ...initialState
    };
  }

  saveAndContinue = e => {
    e.preventDefault();
    let { name, cost, quantity } = this.state.item;
    this.props.getChildItemOnSubmit(name, cost, quantity);
    this.props.nextStep();
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
    // get the change and create a new item list
    // set state itemlist to new item list

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

  handleRemove(i) {
    this.setState({
      item: {
        name: this.state.item.name.filter((name, index) => index != i),
        cost: this.state.item.cost.filter((cost, index) => index != i),
        quantity: this.state.item.quantity.filter(
          (quantity, index) => index != i
        )
      }
    });
    console.log(this.state.item);
  }
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Form color="blue">
          <h1 className="ui centered">Receipt Items</h1>
          {this.state.item.name.map((name, index) => {
            return (
              <div key={name}>
                <Form.Group>
                  <Form.Field>
                    <label> Name </label>
                    <input
                      name="name"
                      onChange={e => this.handleChange(e, index)}
                      value={name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label> Cost </label>
                    <input
                      name="cost"
                      onChange={e => this.handleChange(e, index)}
                      value={this.state.item.cost[index]}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label> Quantity </label>
                    <input
                      name="quantity"
                      onChange={e => this.handleChange(e, index)}
                      value={this.state.item.quantity[index]}
                    />
                  </Form.Field>
                  <DateInput
                    required
                    label="Date Restocked"
                    name="dateRestocked"
                    value={this.state.item.dateRestocked}
                    iconPosition="left"
                  />

                  <Button onClick={() => this.handleRemove(index)}>
                    Remove
                  </Button>
                </Form.Group>
              </div>
            );
          })}
          <br></br>
          <Button onClick={e => this.addItem(e)}> Add Item</Button>
          <Button onClick={this.back}>Back</Button>
          <Button onClick={this.saveAndContinue}>Save And Continue </Button>
        </Form>
      </div>
    );
  }
}

export default Correction;
