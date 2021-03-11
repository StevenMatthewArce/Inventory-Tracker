// Confirmation.jsx
import React, { Component } from "react";
import { Button, List } from "semantic-ui-react";

class Confirmation extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.values.name
    };
  }

=======
>>>>>>> input-receipt
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
<<<<<<< HEAD
=======
    const {
       name, description, cost, quantity, dateRestocked, notes
    } = this.props;

>>>>>>> input-receipt
    return (
      <div>
        <h1 className="ui centered">Confirm your Details</h1>
        <p>
          Click Confirm if the following details have been correctly entered
        </p>
        <List>
<<<<<<< HEAD
          {this.state.name.map((names, index) => {
            return (
              <div key={index}>
                <List.Item>
                  <List.Content>{names}</List.Content>
                </List.Item>
              </div>
            );
          })}
        </List>
        {console.log(this.props)}
        {console.log(this.state.name)}
=======
          <List.Item>
            <List.Icon name="users" />
            <List.Content>First Name: {name}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="users" />
            <List.Content>Last Name: {description}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="mail" />
            <List.Content>
              <a href="mailto:jack@semantic-ui.com">{cost}</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="calendar" />
            <List.Content>{quantity} Years</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="marker" />
            <List.Content>
              {dateRestocked}, {notes}
            </List.Content>
          </List.Item>
        </List>

>>>>>>> input-receipt
        <Button onClick={this.back}>Back</Button>
        <Button onClick={this.saveAndContinue}>Confirm</Button>
      </div>
    );
  }
}

export default Confirmation;
