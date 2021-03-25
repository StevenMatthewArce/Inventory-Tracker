// Confirmation.jsx
import React, { Component } from "react";
import { Button, List, Header, Icon, Message } from "semantic-ui-react";

class Confirmation extends Component {
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
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Header as="h1" textAlign="center">
          Confirm your Details
        </Header>
        <p>
          Click Confirm if the following details have been correctly entered
        </p>
        <List>
          {this.state.item.name.map((name, index) => {
            return (
              <div key={name}>
                <List.Item>
                  <List.Content>
                    {name}
                    {this.state.item.cost[index]}
                    {this.state.item.quantity[index]}
                  </List.Content>
                </List.Item>
              </div>
            );
          })}
        </List>
        <Button onClick={this.back}>Back</Button>
        <Button onClick={this.saveAndContinue}>Confirm</Button>
      </div>
    );
  }
}

export default Confirmation;
