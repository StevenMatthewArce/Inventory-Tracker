import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";

export class Correction extends Component {
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
    this.props.getChidlValueOnSubmit(this.state.value);
    this.props.nextStep();
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
    this.setState({ name: this.state.name });
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Form color="blue">
          <h1 className="ui centered">Receipt Items</h1>
          {console.log(this.state.value)}
          {this.state.value.name.map((name, index) => {
            return (
              <div key={name}>
                <Form.Group>
                  <Form.Field inline>
                    <label> Name </label>
                    <input
                      onChange={e => this.handleChange(e, index)}
                      value={name}
                    />
                  </Form.Field>
                  <Form.Field inline>
                    <label> Cost </label>
                    <input
                      onChange={e => this.handleChange(e, index)}
                      value={this.state.value.cost[index]}
                    />
                  </Form.Field>
                  <Button onClick={() => this.handleRemove(index)}>
                    Remove
                  </Button>
                </Form.Group>
              </div>
            );
          })}
          <br></br>
          {console.log(this.state.name)}
          <Button onClick={e => this.addItem(e)}> Add Item</Button>
          <Button onClick={this.back}>Back</Button>
          <Button onClick={this.saveAndContinue}>Save And Continue </Button>
        </Form>
      </div>
    );
  }
}

export default Correction;
