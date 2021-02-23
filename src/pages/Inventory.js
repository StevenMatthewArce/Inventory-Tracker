import React, { Component } from 'react';
import _ from 'lodash';
import {
  Button,
  Modal,
  Table,
  TableBody
} from 'semantic-ui-react';
import { AddItem } from '../components/InventoryComponents';

const tableData = [
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

  sort(state, action) {
    switch (action.type) {
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          }
        }
  
        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        }
      default:
        throw new Error()
    }
  }


  render() { 

    const [state, dispatch] = React.useReducer(this.sort, {
      column: null,
      data: tableData,
      direction: null,
    })
    const { column, data, direction } = state;

    return (
      <div>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name'})}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'description' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'description'})}
              >
                Description
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'cost' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'cost'})}
              >
                Cost
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'quantity' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'quantity'})}
              >
                Quantity
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dateRestocked' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'dateRestocked'})}
              >
                Date
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(({ name, description, cost, quantity, dateRestocked, notes }) => (
              <Table.Row key={name}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
                <Table.Cell>{cost}</Table.Cell>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>{dateRestocked}</Table.Cell>
                <Table.Cell>{notes}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default Inventory;
