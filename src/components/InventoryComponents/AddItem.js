import React from 'react';
import firebase from '.../firebase.js';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        uid: null,
        name: null,
        description: null,
        cost: null,
        quantity: null,
        dateRestocked: null,
        notes: null,
        photo: null
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>Add item</div>
    )
    
  }
}

export default AddItem;
