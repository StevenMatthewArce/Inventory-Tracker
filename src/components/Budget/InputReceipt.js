import React, { Component } from "react";
import Ocr from "./Ocr";
import Correction from "./Correction";
import Confirmation from "./Confirmation";
import Success from "./Success";

export class InputReceipt extends Component {
  state = {
    name: ["APPLES", "PEARS", "PINEAPPLES"],
    description: [],
    cost: ["3.00", "3.00", "3.00"],
    quantity: [],
    dateRestocked: [],
    notes: [],
    step: 1
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

  handleName = name => {
    this.setState({
      name: [...this.state.name, ...name]
    });
  };

  handleCost = cost => {
    this.setState({
      cost: [...this.state.cost, ...cost]
    });
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
          <Ocr
            nextStep={this.nextStep}
            getChildNameOnSubmit={this.handleName}
            getChildCostOnSubmit={this.handleCost}
            values={values}
          />
        );
      case 2:
        return (
          <Correction
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            getChildNameOnSubmit={this.handleName}
            getChildCostOnSubmit={this.handleCost}
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
