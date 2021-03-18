// Confirmation.jsx
import React, { Component } from "react";
import { Button, List } from "semantic-ui-react";

class Confirmation extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      value: this.props.values
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
        <h1 className="ui centered">Confirm your Details</h1>
        <p>
          Click Confirm if the following details have been correctly entered
        </p>
        <List>
          {this.state.value.name.map((name, index) => {
            return (
              <div key={name}>
                <List.Item>
                  <List.Content>
                    {name}
                    {this.state.value.cost[index]}
                  </List.Content>
                </List.Item>
              </div>
            );
          })}
        </List>
        {console.log(this.props)}
        {console.log(this.state.value.name)}
        <Button onClick={this.back}>Back</Button>
        <Button onClick={this.saveAndContinue}>Confirm</Button>
      </div>
    );
  }
}

export default Confirmation;
