import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { throws } from "assert";

export class Correction extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      name: this.props.values.name
    };

    this.state = {
      ...initialState
    };
  }

  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
    this.props.getChildInputOnSubmit(this.state.name);
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  addItem() {
    this.setState({ name: [...this.state.name, "new"] });
    console.log(this.state.name);
  }

  handleChange(e, index) {
    this.state.name[index] = e.target.value;
    this.setState({ name: this.state.name });
  }

  handleRemove(index) {
    this.state.name.splice(index, 1);
    console.log(this.state.name, "$$$$");

    this.setState({ name: this.state.name });
  }

  render() {
    return (
      <Form color="blue">
        <h1 className="ui centered">Receipt Items</h1>
        <label> Item </label>
        {this.state.name.map((names, index) => {
          return (
            <div key={index}>
              <input
                onChange={e => this.handleChange(e, index)}
                value={names}
              />
              <Button onClick={() => this.handleRemove(index)}>Remove</Button>
            </div>
          );
        })}
        {console.log(this.props)}
        <Button onClick={e => this.addItem(e)}> Add Item</Button>
        <Button onClick={this.back}>Back</Button>
        <Button onClick={this.saveAndContinue}>Save And Continue </Button>
      </Form>
    );
  }
}

export default Correction;
