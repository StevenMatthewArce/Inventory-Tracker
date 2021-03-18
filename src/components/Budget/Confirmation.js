// Confirmation.jsx
import React, { Component } from "react";
import { Button, List } from "semantic-ui-react";

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.values.name,
      cost: this.props.values.cost
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
      <div>
        <h1 className="ui centered">Confirm your Details</h1>
        <p>
          Click Confirm if the following details have been correctly entered
        </p>
        <List>
          {this.state.name.map((names, costs, index) => {
            return (
              <div key={index}>
                <List.Item>
                  <List.Content>
                    {names}
                    {this.state.cost[costs]}
                  </List.Content>
                </List.Item>
              </div>
            );
          })}
        </List>
        {console.log(this.props)}
        {console.log(this.state.name)}
        <Button onClick={this.back}>Back</Button>
        <Button onClick={this.saveAndContinue}>Confirm</Button>
      </div>
    );
  }
}

export default Confirmation;
