import React, { Component } from 'react';
import _ from 'lodash';
import {
  Button,
  Modal,
  Table,
} from 'semantic-ui-react';
import { AddItem } from '../components/InventoryComponents';

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
      <Table striped celled size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Date Restocked</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData.map(({ name, description, cost, dateRestocked, notes}) => (
            <Table.Row key={name}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{description}</Table.Cell>
              <Table.Cell>{cost}</Table.Cell>
              <Table.Cell>{dateRestocked}</Table.Cell>
              <Table.Cell>{notes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
  
}

export default Inventory;
