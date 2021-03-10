import React, { Component } from "react";
import ImageLoader from "./ImageLoader";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";

export class InputReceipt extends Component {
  state = {
    name: [""],
    description: "",
    cost: "",
    quantity: "",
    dateRestocked: "",
    notes: "",
    step: 1
    // firstName: "",
    // lastName: "",
    // email: "",
    // age: "",
    // city: "",
    // country: ""
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      name,
      description,
      cost,
      quantity,
      dateRestocked,
      notes
    } = this.state;
    const values = { name, description, cost, quantity, dateRestocked, notes };
    switch (step) {
      case 1:
        return (
          <ImageLoader
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
    }
  }
}

export default InputReceipt;
