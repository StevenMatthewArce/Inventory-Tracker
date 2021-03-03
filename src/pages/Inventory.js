import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import firebase from '../firebase.js';

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

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item.uid
        })
      }
    })
  }

  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Date Restocked</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData.map(({ name, description, cost, dateRestocked, notes}) => (
            <Table.Row key={name}>
              <Table.Cell textAlign='left'>{name}</Table.Cell>
              <Table.Cell textAlign='left'>{description}</Table.Cell>
              <Table.Cell textAlign='left'>{cost}</Table.Cell>
              <Table.Cell textAlign='left'>{dateRestocked}</Table.Cell>
              <Table.Cell textAlign='left'>{notes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
  
}

export default Inventory;