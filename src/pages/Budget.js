import React, { Component } from "react";
import { InputReceipt } from "../components/Budget";
{
  /*
  Class for budgeting and visualization
*/
}
const AddTripButton = props => {
  return <button onClick={props.addTrip}>Add a trip</button>;
};

const AnotherComponent = props => {
  return <button onClick={props.addTrip}>Add a different trip</button>;
};

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmptyState: true
    };
  }

  triggerAddTripState = () => {
    this.setState({
      ...this.state,
      isEmptyState: !this.state.isEmptyState,
      isAddTripState: !this.state.isAddTripState
    });
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        {this.state.isEmptyState && (
          <AddTripButton addTrip={this.triggerAddTripState} />
        )}

        {this.state.isAddTripState && (
          <AnotherComponent addTrip={this.triggerAddTripState} />
        )}
      </div>
    );
  }
}

export default Budget;
