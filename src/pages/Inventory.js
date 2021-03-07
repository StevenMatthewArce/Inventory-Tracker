import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table,
  Button
 } from 'semantic-ui-react';

const tableData = [
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
  { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'}
]

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        uid: '12345',
        name: 'default',
        description: 'placeholder',
        cost: '0',
        quantity: '12',
        dateRestocked: '12/12/2000',
        notes: 'N/A',
        photo: null
      }
    }
  }

  render() {
    return (
      <div style={{height: '100vh'}} >Inventory Tracker</div>
    )
  }
}

export default Inventory;